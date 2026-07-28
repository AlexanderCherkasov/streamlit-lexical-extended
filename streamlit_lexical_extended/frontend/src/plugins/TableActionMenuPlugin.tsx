import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext'
import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  type LexicalEditor,
} from 'lexical'
import {
  $deleteTableColumnAtSelection,
  $deleteTableRowAtSelection,
  $insertTableColumnAtSelection,
  $insertTableRowAtSelection,
  TableCellNode,
  $getNodeTriplet,
} from '@lexical/table'

function useRootElement(editor: LexicalEditor) {
  const [root, setRoot] = useState<HTMLElement | null>(null)
  useEffect(() => {
    const r = editor.getRootElement()
    setRoot(r)
    return editor.registerRootListener((nextRoot: HTMLElement | null) => {
      setRoot(nextRoot)
    })
  }, [editor])
  return root
}

export default function TableActionMenuPlugin() {
  const [editor] = useLexicalComposerContext()
  const root = useRootElement(editor)

  const [menu, setMenu] = useState<{x: number; y: number; cellKey: string | null} | null>(null)
  const [chevronButton, setChevronButton] = useState<{cellKey: string; cellElement: HTMLElement} | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const chevronRef = useRef<HTMLButtonElement | null>(null)

  const closeMenu = useCallback(() => {
    setMenu(null)
    setChevronButton(null)
  }, [])

  // Track selection changes to show/hide chevron button
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode()
          const focusNode = selection.focus.getNode()
          
          // Check if selection is within a table cell
          let cellNode = null
          let currentNode = anchorNode
          
          // Traverse up to find table cell
          while (currentNode && !cellNode) {
            if (currentNode instanceof TableCellNode) {
              cellNode = currentNode
              break
            }
            const parent = currentNode.getParent()
            if (!parent) break
            currentNode = parent
          }
          
          if (cellNode && anchorNode === focusNode) {
            // We're in a table cell, show chevron button
            const cellKey = cellNode.getKey()
            const cellElement = editor.getElementByKey(cellKey) as HTMLElement
            
            if (cellElement) {
              setChevronButton({ cellKey, cellElement })
            }
          } else {
            setChevronButton(null)
          }
        } else {
          setChevronButton(null)
        }
      })
    })
  }, [editor])

  useEffect(() => {
    if (!root) return

    const onContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const cellEl = target?.closest('td,th') as HTMLElement | null
      if (!cellEl) {
        return
      }
      e.preventDefault()
      const key = cellEl.getAttribute('data-lexical-node-key')
      if (key) {
        editor.update(() => {
          const node = $getNodeByKey(key)
          if (node && node instanceof TableCellNode) {
            // Select the cell so mutations apply in the right place
            node.select()
          }
        })
      }
      
      // Position menu within component bounds - convert to relative coordinates
      const rootRect = root.getBoundingClientRect()
      const menuWidth = 200 // menu width with padding
      const menuHeight = 220 // menu height with all sections
      
      // Convert mouse position to relative coordinates within the editor
      let x = e.clientX - rootRect.left
      let y = e.clientY - rootRect.top
      
      // Ensure menu stays within component bounds (with padding)
      const padding = 10
      if (x + menuWidth > rootRect.width - padding) {
        x = rootRect.width - menuWidth - padding
      }
      if (x < padding) {
        x = padding
      }
      if (y + menuHeight > rootRect.height - padding) {
        y = rootRect.height - menuHeight - padding
      }
      if (y < padding) {
        y = padding
      }
      
      setMenu({x, y, cellKey: key})
    }

    root.addEventListener('contextmenu', onContextMenu)
    return () => root.removeEventListener('contextmenu', onContextMenu)
  }, [editor, root])

  useEffect(() => {
    if (!menu || !root) return
    const ownerDocument = root.ownerDocument
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !e.composedPath().includes(menuRef.current)) {
        closeMenu()
      }
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    ownerDocument.addEventListener('mousedown', handleClickOutside)
    ownerDocument.addEventListener('keydown', handleEsc)
    return () => {
      ownerDocument.removeEventListener('mousedown', handleClickOutside)
      ownerDocument.removeEventListener('keydown', handleEsc)
    }
  }, [menu, root, closeMenu])

  const run = useCallback((fn: () => void) => {
    editor.update(() => {
      fn()
    })
    closeMenu()
  }, [editor, closeMenu])

  const showMenuFromChevron = useCallback((cellKey: string, cellElement: HTMLElement) => {
    if (!root) return
    
    const cellRect = cellElement.getBoundingClientRect()
    const rootRect = root.getBoundingClientRect()
    const menuWidth = 200 // menu width with padding
    const menuHeight = 220 // menu height with all sections
    
    // Convert cell position to relative coordinates within the editor
    const cellRelativeLeft = cellRect.left - rootRect.left
    const cellRelativeTop = cellRect.top - rootRect.top
    const cellRelativeRight = cellRect.right - rootRect.left
    
    // Position menu to the right of the cell, or left if not enough space
    let x = cellRelativeRight + 5
    let y = cellRelativeTop
    
    // Ensure menu stays within component bounds (with padding)
    const padding = 10
    if (x + menuWidth > rootRect.width - padding) {
      // Not enough space on the right, position on the left
      x = cellRelativeLeft - menuWidth - 5
      if (x < padding) {
        // Not enough space on either side, center it
        x = Math.max(padding, (rootRect.width - menuWidth) / 2)
      }
    }
    
    if (y + menuHeight > rootRect.height - padding) {
      y = rootRect.height - menuHeight - padding
    }
    if (y < padding) {
      y = padding
    }
    
    setMenu({ x, y, cellKey })
  }, [root])

  return (
    <>
      {/* Chevron button positioned relative to editor container */}
      {chevronButton && !menu && root && (() => {
        const cellRect = chevronButton.cellElement.getBoundingClientRect()
        const rootRect = root.getBoundingClientRect()
        
        // Calculate position relative to editor container
        const cellRelativeTop = cellRect.top - rootRect.top
        const cellRelativeRight = cellRect.right - rootRect.left
        
        // Position chevron button within cell, but ensure it stays within editor bounds
        let top = cellRelativeTop + (chevronButton.cellElement.offsetHeight / 2) - 8
        let left = cellRelativeRight - 20
        
        // Ensure button stays within editor bounds
        const buttonSize = 16
        if (left + buttonSize > rootRect.width - 5) {
          left = rootRect.width - buttonSize - 5
        }
        if (left < 5) {
          left = 5
        }
        if (top + buttonSize > rootRect.height - 5) {
          top = rootRect.height - buttonSize - 5
        }
        if (top < 5) {
          top = 5
        }
        
        return (
          <button
            ref={chevronRef}
            className="table-cell-chevron"
            style={{
              position: 'absolute',
              top,
              left,
              zIndex: 1001
            }}
            onClick={() => showMenuFromChevron(chevronButton.cellKey, chevronButton.cellElement)}
            onMouseDown={(e) => e.preventDefault()} // Prevent losing focus
          >
            ▼
          </button>
        )
      })()}
      
      {/* Compact context menu with horizontal button rows - positioned within editor */}
      {menu && root && (
        <div
          className="table-context-menu"
          ref={menuRef}
          style={{
            position: 'absolute',
            top: menu.y,
            left: menu.x,
            zIndex: 1002
          }}
        >
          <div className="menu-section">
            <span className="section-label">Row</span>
            <div className="button-row">
              <button onClick={() => run(() => $insertTableRowAtSelection(false))}>+Above</button>
              <button onClick={() => run(() => $insertTableRowAtSelection(true))}>+Below</button>
              <button onClick={() => run(() => $deleteTableRowAtSelection())}>Delete</button>
            </div>
          </div>
          <div className="divider" />
          <div className="menu-section">
            <span className="section-label">Column</span>
            <div className="button-row">
              <button onClick={() => run(() => $insertTableColumnAtSelection(false))}>+Left</button>
              <button onClick={() => run(() => $insertTableColumnAtSelection(true))}>+Right</button>
              <button onClick={() => run(() => $deleteTableColumnAtSelection())}>Delete</button>
            </div>
          </div>
          <div className="divider" />
          <div className="menu-section">
            <span className="section-label">Table</span>
            <div className="button-row">
              <button
                className="danger"
                onClick={() =>
                  run(() => {
                    const key = menu?.cellKey
                    if (!key) return
                    const node = $getNodeByKey(key)
                    if (!node) return
                    try {
                      const [, , tableNode] = $getNodeTriplet(node)
                      tableNode.remove()
                    } catch {
                      // ignore
                    }
                  })
                }
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
