import type { ElementTransformer } from '@lexical/markdown'
import {
  TableNode,
  TableRowNode,
  TableCellNode,
  $createTableNodeWithDimensions,
  TableCellHeaderStates
} from '@lexical/table'
import type { LexicalNode } from 'lexical'
import { $createParagraphNode, $createTextNode, $getRoot, ElementNode } from 'lexical'
import {
  $generateNodesFromMarkdownString,
  TRANSFORMERS,
} from '@lexical/markdown'

// Regex patterns for markdown table detection
const TABLE_ROW_REGEXP = /^\s*\|(.+?)\|\s*$/
const TABLE_DIVIDER_REGEXP = /^\s*\|\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|\s*$/

// Column alignment types (string values for parsing, numeric values from Lexical)
type ColumnAlignment = 'left' | 'center' | 'right' | 1 | 2 | 3 | null

/**
 * Parses column alignments from table divider row
 */
function parseColumnAlignments(dividerLine: string): ColumnAlignment[] {
  const cells = safeSplitRow(dividerLine)
  return cells.map(cell => {
    const trimmed = cell.trim()
    if (trimmed.startsWith(':') && trimmed.endsWith(':')) {
      return 'center'
    } else if (trimmed.endsWith(':')) {
      return 'right'
    } else if (trimmed.startsWith(':')) {
      return 'left'
    }
    return null // Default alignment
  })
}

/**
 * Safely splits a table row, handling escaped pipes
 */
function safeSplitRow(line: string): string[] {
  const placeholder = '\uE000'
  let s = line
  // Replace escaped pipes with placeholder
  s = s.replace(/\\\|/g, placeholder)
  s = s.trim()
  // Remove leading and trailing pipes
  if (s.startsWith('|')) s = s.slice(1)
  if (s.endsWith('|')) s = s.slice(0, -1)
  // Split by pipes and restore escaped pipes
  return s.split('|').map((cell) => cell.replace(new RegExp(placeholder, 'g'), '|').trim())
}

/**
 * Escapes pipe characters for markdown export
 */
function escapePipes(text: string): string {
  return text.replace(/\|/g, '\\|')
}

// A physical newline terminates a Markdown table row. Keep cell-level line
// boundaries as a tab so the value remains one valid table row and can be
// reconstructed when the Markdown is imported again.
const TABLE_LINE_BREAK_REGEXP = /\t/g

function paragraphToMarkdown(node: ElementNode): string {
  return node.getAllTextNodes().map(textNode => {
    let text = textNode.getTextContent()
    if (textNode.hasFormat('code')) text = `\`${text}\``
    if (textNode.hasFormat('bold')) text = `**${text}**`
    if (textNode.hasFormat('italic')) text = `*${text}*`
    if (textNode.hasFormat('strikethrough')) text = `~~${text}~~`
    return text
  }).join('').trim()
}

function applyCellAlignment(paragraph: ElementNode, alignment?: ColumnAlignment) {
  if (!alignment) return

  const format = alignment === 'left' ? 'left' :
    alignment === 'center' ? 'center' :
      alignment === 'right' ? 'right' : ''
  if (format) {
    paragraph.setFormat(format)
  }
}

/** Fills a table cell, treating tabs as logical line separators. */
function fillCellFromMarkdown(cell: TableCellNode, content: string, alignment?: ColumnAlignment) {
  cell.clear()

  const textFormatTransformers = TRANSFORMERS.filter(t =>
    t.type === 'text-format' || t.type === 'text-match'
  )
  const segments = content.split(TABLE_LINE_BREAK_REGEXP)

  for (const segment of segments) {
    const trimmed = segment.trim()
    let importedParagraphs: ElementNode[] = []

    if (trimmed) {
      try {
        importedParagraphs = $generateNodesFromMarkdownString(
          trimmed,
          textFormatTransformers,
          true,
        ).filter((node): node is ElementNode => node instanceof ElementNode)
      } catch {
        importedParagraphs = []
      }
    }

    if (!importedParagraphs.length) {
      importedParagraphs = [$createParagraphNode()]
      if (trimmed) {
        importedParagraphs[0].append($createTextNode(trimmed))
      }
    }

    importedParagraphs.forEach(paragraph => {
      applyCellAlignment(paragraph, alignment)
      cell.append(paragraph)
    })
  }
}

/**
 * Custom table transformer for Lexical markdown integration
 */
export const TABLE_TRANSFORMER: ElementTransformer = {
  dependencies: [TableNode, TableRowNode, TableCellNode],

  export: (node: LexicalNode, exportChildren: (node: ElementNode) => string) => {
    if (!(node instanceof TableNode)) return null

    const rows = node.getChildren()
    if (!rows.length) return null

    const outRows: string[][] = []
    let maxCols = 0

    // Process each row
    rows.forEach((rowNode) => {
      if (!(rowNode instanceof TableRowNode)) return

      const cellStrings: string[] = []
      rowNode.getChildren().forEach((cellNode) => {
        if (!(cellNode instanceof TableCellNode)) return

        // Custom export for table cells to handle line breaks properly
        let cellMarkdown = ''
        
        // Get all paragraphs in the cell
        const paragraphs = cellNode.getChildren()
        const paragraphTexts: string[] = []
        
        paragraphs.forEach((paragraph) => {
          if (paragraph.getType() === 'paragraph') {
            // Export each paragraph separately
            const paragraphText = exportChildren(paragraph as unknown as ElementNode)
            if (paragraphText.trim()) {
              paragraphTexts.push(paragraphText.trim())
            }
          }
        })
        
        // Markdown table cells cannot contain a physical newline. Use a tab
        // as a compact, reversible logical separator instead.
        cellMarkdown = paragraphTexts.join('\t')
        
        // Debug: log the cell processing (uncomment for debugging)
        // console.log('Cell paragraphs:', paragraphTexts.length, 'Content:', JSON.stringify(cellMarkdown))
        
        // Handle any remaining line breaks and escape pipes
        // First, normalize all types of line breaks
        cellMarkdown = cellMarkdown.replace(/\r\n/g, '\n') // Windows line endings
        cellMarkdown = cellMarkdown.replace(/\r/g, '\n')   // Mac line endings
        
        // Convert line breaks produced by nested Lexical nodes to the same
        // inline marker used between cell paragraphs.
        cellMarkdown = cellMarkdown.replace(/\n+/g, '\t')
        
        cellMarkdown = escapePipes(cellMarkdown)

        cellStrings.push(cellMarkdown.trim())
      })

      maxCols = Math.max(maxCols, cellStrings.length)
      outRows.push(cellStrings)
    })

    // Ensure all rows have the same number of columns
    outRows.forEach((row) => {
      while (row.length < maxCols) {
        row.push('')
      }
    })

    if (outRows.length === 0) return null

    // Detect column alignments from the first row cells
    const columnAlignments: ColumnAlignment[] = []
    const firstRow = rows[0] as TableRowNode
    if (firstRow) {
      firstRow.getChildren().forEach((cellNode, idx) => {
        if (cellNode instanceof TableCellNode && idx < maxCols) {
          const firstParagraph = cellNode.getFirstChild()
          if (firstParagraph instanceof ElementNode && firstParagraph.getType() === 'paragraph') {
            const format = firstParagraph.getFormat()
            columnAlignments[idx] =
              format === 1 || format === 2 || format === 3
                ? format
                : null
          } else {
            columnAlignments[idx] = null
          }
        }
      })
    }

    // Fill remaining columns with null alignment
    while (columnAlignments.length < maxCols) {
      columnAlignments.push(null)
    }

    // Create markdown table format
    const mkRow = (cells: string[]) => `| ${cells.join(' | ')} |`

    // Create separator row with alignment indicators
    const separatorCells = columnAlignments.map(alignment => {
      // Lexical uses numeric constants: 1 = left, 2 = center, 3 = right, 0 = default
      switch (alignment) {
        case 1: // left
        case 'left':
          return ':---'
        case 2: // center
        case 'center':
          return ':---:'
        case 3: // right
        case 'right':
          return '---:'
        default:
          return '---'
      }
    })

    const lines: string[] = []

    // Header row (first row)
    const header = outRows[0]
    lines.push(mkRow(header))

    // Separator row with alignment
    lines.push(`| ${separatorCells.join(' | ')} |`)

    // Body rows
    const body = outRows.slice(1)
    body.forEach((row) => {
      lines.push(mkRow(row))
    })

    return lines.join('\n')
  },

  regExp: /^$/,  // Never match during import - we handle this in post-processing

  replace: () => false,  // Never replace during import

  type: 'element',
}

/**
 * Transform function to convert markdown tables to Lexical table nodes
 * This should be called after initial markdown conversion
 */
export function $convertMarkdownTablesToTableNodes(): void {
  const root = $getRoot()
  let i = 0

  while (i < root.getChildrenSize()) {
    const children = root.getChildren()
    const node = children[i]

    if (!(node instanceof ElementNode) || node.getType() !== 'paragraph') {
      i++
      continue
    }

    // Lexical 0.48 imports each Markdown table line as an independent
    // paragraph. Export the paragraph back through the stable Markdown
    // transformers so inline formatting inside cells is retained.
    const firstLine = paragraphToMarkdown(node)
    const dividerNode = children[i + 1]
    if (
      !TABLE_ROW_REGEXP.test(firstLine) ||
      !(dividerNode instanceof ElementNode) ||
      dividerNode.getType() !== 'paragraph'
    ) {
      i++
      continue
    }

    const secondLine = paragraphToMarkdown(dividerNode)
    if (!TABLE_DIVIDER_REGEXP.test(secondLine)) {
      i++
      continue
    }

    const tableParagraphs: ElementNode[] = [node, dividerNode]
    const bodyLines: string[] = []
    let nextIndex = i + 2
    while (nextIndex < children.length) {
      const candidate = children[nextIndex]
      if (!(candidate instanceof ElementNode) || candidate.getType() !== 'paragraph') {
        break
      }
      const line = paragraphToMarkdown(candidate)
      if (!TABLE_ROW_REGEXP.test(line)) {
        break
      }
      tableParagraphs.push(candidate)
      bodyLines.push(line)
      nextIndex++
    }

    const headerCells = safeSplitRow(firstLine)
    const columnAlignments = parseColumnAlignments(secondLine)
    const bodyRows = bodyLines.map((line) => safeSplitRow(line))

    // Calculate dimensions
    let colCount = headerCells.length
    bodyRows.forEach((row) => {
      colCount = Math.max(colCount, row.length)
    })
    colCount = Math.max(1, colCount)
    const rowCount = Math.max(1, bodyRows.length + 1)

    // Create table node
    const table = $createTableNodeWithDimensions(rowCount, colCount, {
      rows: true,
      columns: false
    })

    // Fill table with content
    const tableRows = table.getChildren() as TableRowNode[]

    // Fill header row
    const firstRow = tableRows[0]
    if (firstRow) {
      const firstRowCells = firstRow.getChildren()
      for (let idx = 0; idx < Math.min(colCount, firstRowCells.length); idx++) {
        const cellNode = firstRowCells[idx]
        if (cellNode instanceof TableCellNode) {
          const alignment = columnAlignments[idx] || null
          fillCellFromMarkdown(cellNode, headerCells[idx] ?? '', alignment)
          cellNode.setHeaderStyles(TableCellHeaderStates.ROW)
        }
      }
    }

    // Fill body rows
    const bodyRowNodes = tableRows.slice(1)
    bodyRowNodes.forEach((rowNode, rIdx) => {
      const rowCells = bodyRows[rIdx] ?? []
      const rowCellNodes = rowNode.getChildren()

      for (let cIdx = 0; cIdx < Math.min(colCount, rowCellNodes.length); cIdx++) {
        const cellNode = rowCellNodes[cIdx]
        if (cellNode instanceof TableCellNode) {
          const alignment = columnAlignments[cIdx] || null
          fillCellFromMarkdown(cellNode, rowCells[cIdx] ?? '', alignment)
        }
      }
    })

    // Replace every source paragraph in the table block with one table node.
    node.insertBefore(table)
    tableParagraphs.forEach(paragraph => paragraph.remove())

    i = root.getChildren().indexOf(table) + 1
  }
}
