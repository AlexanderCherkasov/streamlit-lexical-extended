import React, { useEffect, useRef, useCallback, useMemo } from "react"
import {
  Streamlit,
  withStreamlitConnection,
  ComponentProps,
} from "streamlit-component-lib"
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
import { $getRoot, CLEAR_HISTORY_COMMAND } from "lexical"
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
  if (transformer.type === 'text-match' && (transformer as any).regExp && (transformer as any).regExp.toString().includes('\\[')) {
    return false;
  }
  return true;
})

interface StreamlitLexicalArgs {
  height?: number | null
  min_height: number
  value: string
  placeholder: string
  debounce: number
  key: string
  overwrite: boolean
}

// Generate a unique instance ID for each editor
let instanceCounter = 0

function StreamlitLexical({ args, theme: streamlitTheme }: ComponentProps) {
  const typedArgs = args as StreamlitLexicalArgs

  // Generate stable instance ID for this component
  const instanceIdRef = useRef<string>(`lexical-${++instanceCounter}-${Date.now()}`)

  // Store initial value - only set once
  const initialValueRef = useRef<string>(typedArgs.value || "")

  // Track the current markdown to detect external changes
  const currentMarkdownRef = useRef<string>(typedArgs.value || "")

  // Track if component has mounted and sent initial value
  const hasSentInitialValue = useRef(false)

  // Debounce timer ref
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Track update version to prevent race conditions
  const updateVersionRef = useRef(0)

  // Ref to the editor container for height calculation
  const editorContainerRef = useRef<HTMLDivElement>(null)

  // Generate unique namespace using key or instance ID
  const namespace = useMemo(() => {
    const keyPart = typedArgs.key || instanceIdRef.current
    return `StreamlitLexicalEditor-${keyPart}`
  }, [typedArgs.key])

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

  // Function to update frame height based on mode
  const updateFrameHeight = useCallback(() => {
    if (typedArgs.height) {
      // Fixed height mode
      Streamlit.setFrameHeight(typedArgs.height)
    } else {
      // Auto-expand mode: measure content and respect min_height
      if (editorContainerRef.current) {
        const contentHeight = editorContainerRef.current.scrollHeight
        const finalHeight = Math.max(contentHeight, typedArgs.min_height || 400)
        Streamlit.setFrameHeight(finalHeight)
      } else {
        // Fallback if ref not ready
        Streamlit.setFrameHeight(typedArgs.min_height || 400)
      }
    }
  }, [typedArgs.height, typedArgs.min_height])

  // Send initial value to Streamlit on mount and set frame height
  useEffect(() => {
    if (!hasSentInitialValue.current) {
      const initialValue = typedArgs.value || ""
      currentMarkdownRef.current = initialValue
      Streamlit.setComponentValue(initialValue)
      hasSentInitialValue.current = true
      console.log('Sent initial value to Streamlit:', initialValue.substring(0, 100))
    }

    // Set initial frame height - CRITICAL: without this, iframe has height 0
    updateFrameHeight()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run on mount

  // Update height when content changes (auto-expand mode only)
  useEffect(() => {
    if (!typedArgs.height) {
      // Only in auto-expand mode
      const timer = setTimeout(() => {
        updateFrameHeight()
      }, 100) // Small delay to let DOM update

      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typedArgs.height, updateFrameHeight]) // currentMarkdownRef is intentionally excluded

  // Handle editor changes with proper debouncing
  const handleEditorChange = useCallback((editorState: any) => {
    editorState.read(() => {
      const markdown = $convertToMarkdownString([TABLE_TRANSFORMER, ...SAFE_TRANSFORMERS], undefined, true)

      // Clear existing timeout
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }

      // Create new timeout
      debounceTimerRef.current = setTimeout(() => {
        // Update our tracking ref
        currentMarkdownRef.current = markdown
        updateVersionRef.current++

        // Send to Streamlit
        const valueToSend = markdown !== null && markdown !== undefined ? markdown : ""
        Streamlit.setComponentValue(valueToSend)
        console.log('Editor changed, sent to Streamlit:', valueToSend.substring(0, 100))

        // Update height in auto-expand mode
        if (!typedArgs.height) {
          setTimeout(() => updateFrameHeight(), 50)
        }
      }, typedArgs.debounce)
    })
  }, [typedArgs.debounce, typedArgs.height, updateFrameHeight])

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  const style: React.CSSProperties = {}
  if (streamlitTheme) {
    style.borderColor = streamlitTheme.primaryColor
  }

  // Calculate editor style based on mode
  const editorStyle: React.CSSProperties = typedArgs.height
    ? {
        // Fixed height mode
        minHeight: `${typedArgs.height}px`,
        maxHeight: `${typedArgs.height}px`,
        overflowY: "auto",
      }
    : {
        // Auto-expand mode
        minHeight: `${typedArgs.min_height || 400}px`,
        overflowY: "auto",
      }

  return (
    <div ref={editorContainerRef} style={style} className="streamlit-lexical-editor">
      <LexicalComposer initialConfig={editorConfig} key={namespace}>
        <EditorContentUpdater
          content={typedArgs.value || ""}
          overwrite={typedArgs.overwrite}
          currentMarkdownRef={currentMarkdownRef}
          updateVersionRef={updateVersionRef}
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
              placeholder={<Placeholder text={typedArgs.placeholder} />}
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
  overwrite,
  currentMarkdownRef,
  updateVersionRef,
}: {
  content: string
  overwrite: boolean
  currentMarkdownRef: React.MutableRefObject<string>
  updateVersionRef: React.MutableRefObject<number>
}) {
  const [editor] = useLexicalComposerContext()
  const prevContentRef = useRef<string>(content)
  const localVersionRef = useRef<number>(0)

  useEffect(() => {
    // Skip if content hasn't actually changed
    if (content === prevContentRef.current) {
      return
    }

    // Skip if this is just our own update echoing back
    if (content === currentMarkdownRef.current && localVersionRef.current === updateVersionRef.current) {
      return
    }

    prevContentRef.current = content
    localVersionRef.current = updateVersionRef.current

    editor.update(() => {
      const root = $getRoot()
      const currentText = root.getTextContent()

      // Only update if:
      // 1. Root is empty, OR
      // 2. overwrite is true AND content is different from what we have
      if (currentText === "" || (overwrite && content !== currentMarkdownRef.current)) {
        root.clear()
        console.log('Updating editor with new content:', content.substring(0, 100))

        if (content) {
          $convertFromMarkdownString(
            content,
            [TABLE_TRANSFORMER, ...SAFE_TRANSFORMERS],
            undefined,
            true
          )
          // Convert markdown tables to table nodes
          $convertMarkdownTablesToTableNodes()
        }

        // Clear history to prevent undo to empty state
        editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined)

        // Update our ref to match the new content
        currentMarkdownRef.current = content
      }
    })
  }, [editor, content, overwrite, currentMarkdownRef, updateVersionRef])

  return null
}

function Placeholder({ text }: { text: string }) {
  return <div className="editor-placeholder">{text}</div>
}

export default withStreamlitConnection(StreamlitLexical)