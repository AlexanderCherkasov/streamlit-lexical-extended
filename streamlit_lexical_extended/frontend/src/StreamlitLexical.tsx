import type {
  FrontendRendererArgs,
  FrontendState,
} from "@streamlit/component-v2-lib"
import React, { useEffect, useRef, useCallback, useMemo } from "react"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import ToolbarPlugin, {
  DEFAULT_TOOLBAR_TOOLS,
  type ToolbarTool,
} from "./plugins/ToolbarPlugin"

import theme from "./theme"
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"
import {
  $getRoot,
  CLEAR_HISTORY_COMMAND,
  SKIP_SELECTION_FOCUS_TAG,
  type EditorState,
  type LexicalEditor,
} from "lexical"
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from "@lexical/markdown"

import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { CodeNode } from "@lexical/code"
import { ListNode, ListItemNode } from "@lexical/list"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table"
import { TablePlugin } from "@lexical/react/LexicalTablePlugin"
import TableActionMenuPlugin from "./plugins/TableActionMenuPlugin"
import { TABLE_TRANSFORMER, $convertMarkdownTablesToTableNodes } from "./markdown/tableTransformer"

const EXTERNAL_UPDATE_TAG = "streamlit-lexical-external-update"

// Filter out link transformers from default TRANSFORMERS
const SAFE_TRANSFORMERS = TRANSFORMERS.filter(transformer => {
  // Remove link-related transformers by checking their export function or regExp
  if (
    transformer.type === 'text-match' &&
    transformer.regExp.toString().includes('\\[')
  ) {
    return false;
  }
  return true;
})

const MARKDOWN_FENCE_REGEXP = /^\s{0,3}(`{3,}|~{3,})/
const MARKDOWN_STRUCTURAL_LINE_REGEXP =
  /^\s{0,3}(?:#{1,6}(?:\s|$)|>|(?:[-+*]|\d+[.)])\s|\||(?:-{3,}|_{3,}|\*{3,})\s*$)/

/**
 * Streamlit's Markdown renderer treats a single newline inside a plain-text
 * block as a soft break and displays it as a space. Lexical paragraphs are
 * exported as single-newline-separated lines, so preserve visible editor line
 * breaks with the Markdown hard-break marker (two trailing spaces).
 *
 * Structural Markdown blocks must be left untouched: adding trailing spaces to
 * list, table, quote, heading, or fenced-code lines can change their meaning.
 */
function preserveStreamlitLineBreaks(markdown: string): string {
  const lines = markdown.split("\n")
  let fence: string | null = null

  return lines
    .map((line, index) => {
      const fenceMatch = line.match(MARKDOWN_FENCE_REGEXP)
      if (fenceMatch) {
        const marker = fenceMatch[1][0]
        if (fence === null) {
          fence = marker
        } else if (fence === marker) {
          fence = null
        }
        return line
      }

      if (fence !== null) {
        return line
      }

      const nextLine = lines[index + 1]
      const isPlainLine = (candidate: string): boolean => {
        if (!candidate.trim() || candidate.startsWith("    ")) {
          return false
        }
        return !MARKDOWN_STRUCTURAL_LINE_REGEXP.test(candidate)
      }

      if (
        nextLine &&
        isPlainLine(line) &&
        isPlainLine(nextLine) &&
        !line.endsWith("\\") &&
        !/ {2,}$/.test(line)
      ) {
        return `${line}  `
      }

      return line
    })
    .join("\n")
}

function removeStreamlitHardBreakMarkers(markdown: string): string {
  const lines = markdown.split("\n")
  let fence: string | null = null

  return lines
    .map(line => {
      const fenceMatch = line.match(MARKDOWN_FENCE_REGEXP)
      if (fenceMatch) {
        const marker = fenceMatch[1][0]
        if (fence === null) {
          fence = marker
        } else if (fence === marker) {
          fence = null
        }
        return line
      }

      if (fence !== null) {
        return line
      }

      return line.replace(/ {2,}$/, "").replace(/\\$/, "")
    })
    .join("\n")
}

export interface StreamlitLexicalState extends FrontendState {
  value: string
}

export interface StreamlitLexicalData {
  value: string | null
  placeholder: string
  debounce: number
  minHeight: number
  fixedHeight: number | null
  toolbar: ToolbarTool[] | null
}

interface StreamlitLexicalProps extends StreamlitLexicalData {
  direction: "ltr" | "rtl"
  instanceKey: string
  setStateValue: FrontendRendererArgs<
    StreamlitLexicalState,
    StreamlitLexicalData
  >["setStateValue"]
}

function StreamlitLexical({
  value,
  placeholder,
  debounce,
  minHeight,
  fixedHeight,
  toolbar,
  direction,
  instanceKey,
  setStateValue,
}: StreamlitLexicalProps) {
  // Store initial value - only set once
  const initialValueRef = useRef<string>(value ?? "")

  // Track the current markdown to detect external changes
  const currentMarkdownRef = useRef<string>(value ?? "")

  // Flag to distinguish local typing updates from external prop changes
  const isLocalUpdate = useRef<boolean>(false)

  // Debounce timer ref
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const namespace = useMemo(
    () => `StreamlitLexicalEditor-${instanceKey}`,
    [instanceKey],
  )

  // Create editor config - stable reference, only created once per namespace
  const editorConfig = useMemo(() => ({
    namespace,
    theme: theme,  // Lexical theme object from theme.ts
    onError: (error: Error) => {
      console.error("Lexical error:", error)
    },
    editorState: () => {
      $convertFromMarkdownString(
        removeStreamlitHardBreakMarkers(initialValueRef.current),
        [TABLE_TRANSFORMER, ...SAFE_TRANSFORMERS],
        undefined,
        true
      )
      $convertMarkdownTablesToTableNodes()
    },
    nodes: [
      HorizontalRuleNode,
      HeadingNode,
      QuoteNode,
      CodeNode,
      ListNode,
      ListItemNode,
      TableNode,
      TableRowNode,
      TableCellNode,
    ],
  }), [namespace]) // Only recreate when namespace changes

  // Handle editor changes with proper debouncing
  const handleEditorChange = useCallback(
    (
      editorState: EditorState,
      _editor: LexicalEditor,
      tags: Set<string>,
    ) => {
      if (tags.has(EXTERNAL_UPDATE_TAG)) {
        return
      }

      isLocalUpdate.current = true

      editorState.read(() => {
        const markdown = preserveStreamlitLineBreaks(
          $convertToMarkdownString(
            [TABLE_TRANSFORMER, ...SAFE_TRANSFORMERS],
            undefined,
            true,
          ),
        )

        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current)
        }

        debounceTimerRef.current = setTimeout(() => {
          const valueToSend = markdown ?? ""
          currentMarkdownRef.current = valueToSend
          setStateValue("value", valueToSend)
        }, debounce)
      })
    },
    [debounce, setStateValue],
  )

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  const isFixedHeight = fixedHeight !== null
  const editorStyle: React.CSSProperties = isFixedHeight
    ? {
        height: "100%",
        minHeight: 0,
        overflowY: "auto",
      }
    : {
        minHeight: `${minHeight}px`,
        overflowY: "visible",
      }
  const toolbarTools = toolbar ?? DEFAULT_TOOLBAR_TOOLS
  const hasToolbar = toolbarTools.length > 0

  return (
    <div
      dir={direction}
      className={`streamlit-lexical-editor ${
        isFixedHeight ? "is-fixed-height" : "is-auto-height"
      }`}
      style={isFixedHeight ? { height: `${fixedHeight}px` } : undefined}
    >
      <LexicalComposer initialConfig={editorConfig} key={namespace}>
        <EditorContentUpdater
          content={value}
          currentMarkdownRef={currentMarkdownRef}
          debounceTimerRef={debounceTimerRef}
          setStateValue={setStateValue}
          isLocalUpdate={isLocalUpdate}
        />
        <div
          className={`editor-container ${
            hasToolbar ? "with-toolbar" : "without-toolbar"
          }`}
        >
          {hasToolbar && <ToolbarPlugin tools={toolbarTools} />}
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="editor-input"
                  style={editorStyle}
                />
              }
              placeholder={<Placeholder text={placeholder} />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <MarkdownShortcutPlugin transformers={[TABLE_TRANSFORMER, ...SAFE_TRANSFORMERS]} />
            <ListPlugin />
            <TabIndentationPlugin />
            <TablePlugin />
            <TableActionMenuPlugin />
            <OnChangePlugin onChange={handleEditorChange} />
          </div>
        </div>
      </LexicalComposer>
    </div>
  )
}

function EditorContentUpdater({
  content,
  currentMarkdownRef,
  debounceTimerRef,
  setStateValue,
  isLocalUpdate,
}: {
  content: string | null
  currentMarkdownRef: React.MutableRefObject<string>
  debounceTimerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
  setStateValue: StreamlitLexicalProps["setStateValue"]
  isLocalUpdate: React.MutableRefObject<boolean>
}) {
  const [editor] = useLexicalComposerContext()
  const prevContentRef = useRef<string | null>(content)

  useEffect(() => {
    // None means "do not send an external update". An empty string is an
    // explicit request to clear the editor.
    if (content === null) {
      isLocalUpdate.current = false
      return
    }

    if (isLocalUpdate.current) {
      isLocalUpdate.current = false
      prevContentRef.current = content
      return
    }

    // Skip if content hasn't actually changed
    if (content === prevContentRef.current || content === currentMarkdownRef.current) {
      return
    }

    prevContentRef.current = content

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = null
    }

    editor.update(
      () => {
        const root = $getRoot()
        root.clear()

        if (content) {
          $convertFromMarkdownString(
            removeStreamlitHardBreakMarkers(content),
            [TABLE_TRANSFORMER, ...SAFE_TRANSFORMERS],
            undefined,
            true
          )
          $convertMarkdownTablesToTableNodes()
        }

        editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined)
        currentMarkdownRef.current = content
      },
      {
        onUpdate: () => {
          setStateValue("value", content)
        },
        tag: [EXTERNAL_UPDATE_TAG, SKIP_SELECTION_FOCUS_TAG],
      },
    )
  }, [
    editor,
    content,
    currentMarkdownRef,
    debounceTimerRef,
    setStateValue,
    isLocalUpdate,
  ])

  return null
}

function Placeholder({ text }: { text: string }) {
  return <div className="editor-placeholder">{text}</div>
}

export default StreamlitLexical
