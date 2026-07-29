"use client";

import { useRef, useState } from "react";

// Drag-and-drop reorder list shared by Anvil's Python `reorder` type and the
// no-code `order` type — both display a scrambled list of labels the learner
// drags into the correct sequence. `items` is the full label array in its
// original (shuffled) order; `order` is the current arrangement, expressed
// as an array of indices into `items`; `onChange` receives the new `order`
// array whenever a drag moves an item to a new position.
//
// Built on Pointer Events (not HTML5 drag-and-drop) specifically because
// Pointer Events unify mouse and touch input in one code path, including
// pointer capture, which lets the element that started a drag keep
// receiving move/up events no matter where the pointer physically travels —
// exactly what a swap-on-hover reorder needs without any document-level
// listeners.
export default function AnvilReorderList({ items, order, onChange }) {
  const itemRefs = useRef({});
  const [draggingIdx, setDraggingIdx] = useState(null);

  function handlePointerDown(e, itemIdx) {
    // Capture failures (e.g. an already-released or otherwise invalid
    // pointer id) shouldn't block the drag itself — worst case, a fast
    // pointer movement off the original element just stops updating.
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setDraggingIdx(itemIdx);
  }

  function handlePointerMove(e) {
    if (draggingIdx === null) return;
    const y = e.clientY;
    let targetPos = null;
    for (let pos = 0; pos < order.length; pos++) {
      const node = itemRefs.current[order[pos]];
      if (!node) continue;
      const rect = node.getBoundingClientRect();
      if (y >= rect.top && y <= rect.bottom) {
        targetPos = pos;
        break;
      }
    }
    if (targetPos === null) return;
    const draggingPos = order.indexOf(draggingIdx);
    if (targetPos === draggingPos) return;
    const next = [...order];
    next.splice(draggingPos, 1);
    next.splice(targetPos, 0, draggingIdx);
    onChange(next);
  }

  function endDrag() {
    setDraggingIdx(null);
  }

  return (
    <div className="anvil-reorder-list">
      {order.map((itemIdx) => (
        <div
          key={itemIdx}
          ref={(node) => {
            itemRefs.current[itemIdx] = node;
          }}
          className={`anvil-reorder-block${draggingIdx === itemIdx ? " anvil-reorder-dragging" : ""}`}
          onPointerDown={(e) => handlePointerDown(e, itemIdx)}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div className="anvil-reorder-handle" aria-hidden="true">
            ⠿
          </div>
          <pre className="forge-terminal forge-code-box" style={{ margin: 0, flex: 1 }}>
            {items[itemIdx]}
          </pre>
        </div>
      ))}
    </div>
  );
}
