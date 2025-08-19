'use client';
import modal from './Modal.module.css';
import LoginForm from './LoginForm';
import { useEffect } from 'react';

export default function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent){ if(e.key === 'Escape') onClose(); }
    if(open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className={modal.wrap}>
      <div className={modal.backdrop} onClick={onClose} />
      <div className={modal.sheet}>
        <div className="card">
          <div className={modal.header}>
            <h3>Login</h3>
            <button className="btn" onClick={onClose}>✕</button>
          </div>
          <LoginForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
}