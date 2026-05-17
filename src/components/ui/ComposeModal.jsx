import { useState } from 'react';
import Modal from './Modal';
import { useApp } from '../../context/AppContext';

export default function ComposeModal() {
  const { setModal, addInboxMessage } = useApp();
  const [form, setForm] = useState({ to: '', subject: '', message: '', tag: 'Sent' });
  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSend = () => {
    if (!form.to.trim() || !form.subject.trim() || !form.message.trim()) {
      alert('Please fill in recipient, subject, and message.');
      return;
    }
    addInboxMessage({
      from: `To: ${form.to}`,
      subject: form.subject,
      preview: form.message,
      tag: form.tag,
    });
    setModal(null);
  };

  return (
    <Modal title="Compose Message" onClose={() => setModal(null)} onSave={handleSend} saveLabel="Send Message">
      <div className="form-group">
        <label className="form-label">To *</label>
        <input className="form-input" value={form.to} onChange={e => set('to', e.target.value)} placeholder="recipient@email.com" />
      </div>
      <div className="form-group">
        <label className="form-label">Subject *</label>
        <input className="form-input" value={form.subject} onChange={e => set('subject', e.target.value)} placeholder="Message subject" />
      </div>
      <div className="form-group">
        <label className="form-label">Tag</label>
        <select className="form-select" value={form.tag} onChange={e => set('tag', e.target.value)}>
          <option>Sent</option>
          <option>Wedding</option>
          <option>Vendor</option>
          <option>Payment</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Message *</label>
        <textarea className="form-textarea" value={form.message} onChange={e => set('message', e.target.value)} placeholder="Write your message..." />
      </div>
    </Modal>
  );
}
