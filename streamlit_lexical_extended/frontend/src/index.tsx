import type {
  FrontendRenderer,
  FrontendRendererArgs,
} from "@streamlit/component-v2-lib"
import { StrictMode } from "react"
import { createRoot, type Root } from "react-dom/client"

import StreamlitLexical, {
  type StreamlitLexicalData,
  type StreamlitLexicalState,
} from "./StreamlitLexical"
import "./styles.css"

// Safe DOM guards for React DOM reconciler unmounting with direct-manipulation editors (Lexical).
if (typeof window !== "undefined" && typeof Node !== "undefined") {
  const originalRemoveChild = Node.prototype.removeChild
  Node.prototype.removeChild = function <T extends Node>(child: T): T {
    if (child.parentNode !== this) {
      if (child.parentNode) {
        return originalRemoveChild.call(child.parentNode, child) as T
      }
      return child
    }
    return originalRemoveChild.call(this, child) as T
  }

  const originalInsertBefore = Node.prototype.insertBefore
  Node.prototype.insertBefore = function <T extends Node>(
    node: T,
    child: Node | null,
  ): T {
    if (child && child.parentNode !== this) {
      return originalInsertBefore.call(this, node, null) as T
    }
    return originalInsertBefore.call(this, node, child) as T
  }
}

type ParentElement = FrontendRendererArgs["parentElement"]

interface ReactRootEntry {
  element: HTMLElement
  generation: number
  root: Root
}

const reactRoots = new WeakMap<ParentElement, ReactRootEntry>()

function getParentDirection(parentElement: ParentElement): "ltr" | "rtl" {
  const styleTarget =
    "host" in parentElement ? parentElement.host : parentElement
  const ownerWindow = styleTarget.ownerDocument.defaultView
  return ownerWindow?.getComputedStyle(styleTarget).direction === "rtl"
    ? "rtl"
    : "ltr"
}

const StreamlitLexicalRenderer: FrontendRenderer<
  StreamlitLexicalState,
  StreamlitLexicalData
> = ({ data, key, parentElement, setStateValue }) => {
  const rootElement = parentElement.querySelector<HTMLElement>(
    ".streamlit-lexical-react-root",
  )

  if (!rootElement) {
    throw new Error("Streamlit Lexical React root element was not found.")
  }

  let entry = reactRoots.get(parentElement)

  // Streamlit can preserve the ShadowRoot while replacing the registered HTML
  // placeholder. Never reuse a React root whose DOM container is now stale.
  if (entry && entry.element !== rootElement) {
    try {
      entry.root.unmount()
    } catch {
      // Ignore DOM unmount errors from detached Lexical nodes
    }
    reactRoots.delete(parentElement)
    entry = undefined
  }

  if (!entry) {
    entry = {
      element: rootElement,
      generation: 0,
      root: createRoot(rootElement),
    }
    reactRoots.set(parentElement, entry)
  }

  const generation = entry.generation + 1
  entry.generation = generation

  entry.root.render(
    <StrictMode>
      <StreamlitLexical
        {...data}
        direction={getParentDirection(parentElement)}
        instanceKey={key}
        setStateValue={setStateValue}
      />
    </StrictMode>,
  )

  return () => {
    // A data update can schedule the previous renderer cleanup after the new
    // render has already started. Only the latest generation owns unmounting.
    const mountedEntry = reactRoots.get(parentElement)
    if (mountedEntry !== entry || mountedEntry.generation !== generation) {
      return
    }
    try {
      mountedEntry.root.unmount()
    } catch {
      // Ignore DOM unmount errors from detached Lexical nodes
    }
    reactRoots.delete(parentElement)
  }
}

export default StreamlitLexicalRenderer
