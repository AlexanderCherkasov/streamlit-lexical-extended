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

type ParentElement = FrontendRendererArgs["parentElement"]

interface ReactRootEntry {
  element: HTMLElement
  generation: number
  root: Root
}

const reactRoots = new WeakMap<ParentElement, ReactRootEntry>()

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
    entry.root.unmount()
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
    mountedEntry.root.unmount()
    reactRoots.delete(parentElement)
  }
}

export default StreamlitLexicalRenderer
