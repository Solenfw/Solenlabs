import { createPortal } from 'react-dom';
import { useState } from 'react';


export const Tooltip = ({ children, content }: { children: React.ReactNode; content: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div
      className="relative"
      onMouseEnter={e => { setVisible(true); setPos({ x: e.clientX, y: e.clientY }); }}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && createPortal(
        <div className="fixed z-50 pointer-events-none bg-slate-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg" style={{ left: pos.x + 10, top: pos.y + 10 }}>
          {content}
        </div>,
        document.body
      )}
    </div>
  );
};