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
import { $convertFromMarkdownString, TRANSFORMERS } from '@lexical/markdown'

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

/**
 * Fills a table cell with markdown content, supporting inline formatting and line breaks
 */
function fillCellFromMarkdown(cell: TableCellNode, content: string, alignment?: ColumnAlignment) {
  cell.clear()

  if (!content.trim()) {
    // Empty cell - add empty paragraph
    const paragraph = $createParagraphNode()
    if (alignment) {
      // Convert alignment to Lexical format type
      const format = alignment === 'left' ? 'left' :
        alignment === 'center' ? 'center' :
          alignment === 'right' ? 'right' : ''
      if (format) {
        paragraph.setFormat(format as any)
      }
    }
    cell.append(paragraph)
    return
  }

  // Create a single paragraph for the cell content (no line breaks in table cells)
  const paragraph = $createParagraphNode()
  if (alignment) {
    // Convert alignment to Lexical format type
    const format = alignment === 'left' ? 'left' :
      alignment === 'center' ? 'center' :
        alignment === 'right' ? 'right' : ''
    if (format) {
      paragraph.setFormat(format as any)
    }
  }
  cell.append(paragraph)

  // Convert markdown formatting within the cell
  try {
    // Use only text format transformers to avoid conflicts
    const textFormatTransformers = TRANSFORMERS.filter(t =>
      t.type === 'text-format' || t.type === 'text-match'
    )
    $convertFromMarkdownString(content.trim(), textFormatTransformers, paragraph, true)
  } catch (error) {
    // Fallback to plain text if markdown parsing fails
    paragraph.append($createTextNode(content.trim()))
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
        
        // Join paragraphs with spaces instead of <br> tags for better Markdown table compatibility
        cellMarkdown = paragraphTexts.join(' ')
        
        // Debug: log the cell processing (uncomment for debugging)
        // console.log('Cell paragraphs:', paragraphTexts.length, 'Content:', JSON.stringify(cellMarkdown))
        
        // Handle any remaining line breaks and escape pipes
        // First, normalize all types of line breaks
        cellMarkdown = cellMarkdown.replace(/\r\n/g, '\n') // Windows line endings
        cellMarkdown = cellMarkdown.replace(/\r/g, '\n')   // Mac line endings
        
        // Convert remaining newlines to spaces for table cells (better Markdown compatibility)
        cellMarkdown = cellMarkdown.replace(/\n+/g, ' ')
        
        // Clean up multiple consecutive spaces
        cellMarkdown = cellMarkdown.replace(/\s+/g, ' ')
        
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
          if (firstParagraph && firstParagraph.getType() === 'paragraph') {
            const format = (firstParagraph as any).getFormat()
            columnAlignments[idx] = format || null
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
  const children = root.getChildren()
  let i = 0

  while (i < children.length) {
    const node = children[i]

    // Look for paragraph nodes that might contain table markdown
    if (!(node instanceof ElementNode) || node.getType() !== 'paragraph') {
      i++
      continue
    }

    const text = node.getTextContent()
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0)

    // Check if this looks like a table (first line is table row, second is divider)
    if (lines.length < 2) {
      i++
      continue
    }

    const firstLine = lines[0]
    const secondLine = lines[1]

    if (!TABLE_ROW_REGEXP.test(firstLine) || !TABLE_DIVIDER_REGEXP.test(secondLine)) {
      i++
      continue
    }

    // Parse table structure from the lines
    const headerCells = safeSplitRow(firstLine)
    const columnAlignments = parseColumnAlignments(secondLine)
    const bodyRows = lines.slice(2).map((line) => safeSplitRow(line))

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

    // Replace the paragraph with the table
    node.insertBefore(table)
    node.remove()

    // Update position after replacement
    const updatedChildren = root.getChildren()
    i = updatedChildren.indexOf(table) + 1
  }
}