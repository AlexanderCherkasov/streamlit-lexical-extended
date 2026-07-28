import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
  KEY_DOWN_COMMAND,
  COMMAND_PRIORITY_LOW
} from 'lexical';
import { useCallback, useEffect, useRef, useState } from 'react';

import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { INSERT_TABLE_COMMAND } from '@lexical/table';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, $isListNode } from '@lexical/list';

const LowPriority = 1;

function Divider() {
  return <div className="divider" />;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [currentHeading, setCurrentHeading] = useState('paragraph');
  const [tablePickerOpen, setTablePickerOpen] = useState(false);
  const [hoverRows, setHoverRows] = useState(0);
  const [hoverCols, setHoverCols] = useState(0);
  const [isQuote, setIsQuote] = useState(false);
  const [isBulletList, setIsBulletList] = useState(false);
  const [isNumberList, setIsNumberList] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));

      // Update heading and block type
      const anchorNode = selection.anchor.getNode();
      const element = anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElement();
      if (element !== null) {
        const elementKey = element.getKey();
        const elementDOM = editor.getElementByKey(elementKey);
        if (elementDOM !== null) {
          if (elementDOM.tagName === 'P') {
            setCurrentHeading('paragraph');
          } else if (elementDOM.tagName.match(/^H[1-6]$/)) {
            setCurrentHeading(elementDOM.tagName.toLowerCase());
          }
        }

        // Check for quote
        setIsQuote(element.getType() === 'quote');

        // Check for lists
        const parent = element.getParent();
        if ($isListNode(element)) {
          setIsBulletList(element.getListType() === 'bullet');
          setIsNumberList(element.getListType() === 'number');
        } else if ($isListNode(parent) && parent !== null) {
          setIsBulletList(parent.getListType() === 'bullet');
          setIsNumberList(parent.getListType() === 'number');
        } else {
          setIsBulletList(false);
          setIsNumberList(false);
        }
      }
    }
  }, [editor]);

  const onHeadingChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () =>
            e.target.value === 'paragraph'
              ? $createParagraphNode()
              : $createHeadingNode(e.target.value as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6')
          );
        }
      });
    },
    [editor]
  );

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        KEY_DOWN_COMMAND,
        (event: KeyboardEvent) => {
          // Ctrl+Shift+X for strikethrough
          if (event.ctrlKey && event.shiftKey && event.key === 'X') {
            event.preventDefault();
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, $updateToolbar]);

  return (
    <div className="toolbar" ref={toolbarRef}>
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced"
        aria-label="Undo">
        <i className="format undo" />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item"
        aria-label="Redo">
        <i className="format redo" />
      </button>
      <Divider />
      <select
        className="toolbar-item block-controls"
        value={currentHeading}
        onChange={onHeadingChange}
      >
        <option value="paragraph">Normal</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="h4">Heading 4</option>
        <option value="h5">Heading 5</option>
        <option value="h6">Heading 6</option>
      </select>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
        className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
        aria-label="Format Bold">
        <i className="format bold" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
        className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
        aria-label="Format Italics">
        <i className="format italic" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
        className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
        aria-label="Format Underline">
        <i className="format underline" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        }}
        className={'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')}
        aria-label="Format Strikethrough (Ctrl+Shift+X)">
        <i className="format strikethrough" />
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createQuoteNode());
            }
          });
        }}
        className={'toolbar-item spaced ' + (isQuote ? 'active' : '')}
        aria-label="Quote">
        <i className="format quote" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        }}
        className={'toolbar-item spaced ' + (isBulletList ? 'active' : '')}
        aria-label="Bullet List">
        <i className="format list-ul" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        }}
        className={'toolbar-item spaced ' + (isNumberList ? 'active' : '')}
        aria-label="Numbered List">
        <i className="format list-ol" />
      </button>
      <Divider />
      <div className="table-button-container">
        <button
          className={'toolbar-item spaced ' + (tablePickerOpen ? 'active' : '')}
          onClick={() => setTablePickerOpen((v) => !v)}
          aria-label="Insert Table"
        >
          <i className="format table" />
        </button>
        {tablePickerOpen && (
          <div
            className="table-insert-popover"
            onMouseLeave={() => {
              setHoverRows(0);
              setHoverCols(0);
            }}
          >
            <div className="table-insert-grid">
              {Array.from({ length: 10 }).map((_, r) => (
                <div key={r} className="table-insert-row">
                  {Array.from({ length: 10 }).map((__, c) => {
                    const row = r + 1;
                    const col = c + 1;
                    const active = row <= hoverRows && col <= hoverCols;
                    return (
                      <div
                        key={c}
                        className={'table-insert-cell' + (active ? ' active' : '')}
                        onMouseEnter={() => {
                          setHoverRows(row);
                          setHoverCols(col);
                        }}
                        onClick={() => {
                          editor.dispatchCommand(INSERT_TABLE_COMMAND, {
                            columns: String(col),
                            rows: String(row),
                            includeHeaders: { rows: true, columns: false },
                          });
                          setTablePickerOpen(false);
                        }}
                        title={`${row} x ${col}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="table-insert-footer">
              {hoverRows > 0 && hoverCols > 0 ? `${hoverRows} x ${hoverCols}` : 'Select size'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
