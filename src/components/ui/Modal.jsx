import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ title, onClose, children, onSave, saveLabel = 'Save' }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 className="modal-title" style={{ margin: 0 }}>{title}</h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-sec)', display: 'flex' }}
          >
            <X size={18} />
          </button>
        </div>
        {children}
        {onSave && (
          <div className="modal-actions">
            <button className="btn-cancel" onClick={onClose}>Cancel</button>
            <button className="btn-save" onClick={onSave}>{saveLabel}</button>
          </div>
        )}
      </div>
    </div>
  );
}
