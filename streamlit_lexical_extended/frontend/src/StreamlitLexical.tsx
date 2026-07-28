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
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"
import ToolbarPlugin from "./plugins/ToolbarPlugin"

import theme from "./theme"
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"
import { $getRoot, CLEAR_HISTORY_COMMAND, type EditorState } from "lexical"
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

export interface StreamlitLexicalState extends FrontendState {
  value: string
}

export interface StreamlitLexicalData {
  value: string | null
  placeholder: string
  debounce: number
  minHeight: number
  fixedHeight: number | null
}

interface StreamlitLexicalProps extends StreamlitLexicalData {
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
  instanceKey,
  setStateValue,
}: StreamlitLexicalProps) {
  // Store initial value - only set once
  const initialValueRef = useRef<string>(value ?? "")

  // Track the current markdown to detect external changes
  const currentMarkdownRef = useRef<string>(value ?? "")

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
        initialValueRef.current,
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
    (editorState: EditorState) => {
      editorState.read(() => {
        const markdown = $convertToMarkdownString(
          [TABLE_TRANSFORMER, ...SAFE_TRANSFORMERS],
          undefined,
          true,
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

  return (
    <div
      className={`streamlit-lexical-editor ${
        isFixedHeight ? "is-fixed-height" : "is-auto-height"
      }`}
      style={isFixedHeight ? { height: `${fixedHeight}px` } : undefined}
    >
      <LexicalComposer initialConfig={editorConfig} key={namespace}>
        <EditorContentUpdater
          content={value}
          currentMarkdownRef={currentMarkdownRef}
        />
        <div className="editor-container">
          <ToolbarPlugin />
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
            <AutoFocusPlugin />
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
}: {
  content: string | null
  currentMarkdownRef: React.MutableRefObject<string>
}) {
  const [editor] = useLexicalComposerContext()
  const prevContentRef = useRef<string | null>(content)

  useEffect(() => {
    // None means "do not send an external update". An empty string is an
    // explicit request to clear the editor.
    if (content === null) {
      return
    }

    // Skip if content hasn't actually changed
    if (content === prevContentRef.current) {
      return
    }

    prevContentRef.current = content

    // A component state update returns to Python and then comes back through
    // data.value. It is already present in Lexical, so importing it again
    // would reset selection, focus, and history.
    if (content === currentMarkdownRef.current) {
      return
    }

    editor.update(() => {
      const root = $getRoot()
      root.clear()

      if (content) {
        $convertFromMarkdownString(
          content,
          [TABLE_TRANSFORMER, ...SAFE_TRANSFORMERS],
          undefined,
          true
        )
        $convertMarkdownTablesToTableNodes()
      }

      editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined)
      currentMarkdownRef.current = content
    })
  }, [editor, content, currentMarkdownRef])

  return null
}

function Placeholder({ text }: { text: string }) {
  return <div className="editor-placeholder">{text}</div>
}

export default StreamlitLexical
