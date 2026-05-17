import { useState } from 'react';
import Modal from './Modal';
import { useApp } from '../../context/AppContext';

export default function NewMeetingModal() {
  const { setModal, addMeeting, events } = useApp();
  const [form, setForm] = useState({ title: '', time: '', client: '', event: events[0]?.name || '', type: 'video', color: '#e8f5e9' });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = () => {
    if (!form.title.trim()) { alert('Please enter a meeting title.'); return; }
    addMeeting(form);
    setModal(null);
  };

  return (
    <Modal title="Schedule Meeting" onClose={() => setModal(null)} onSave={handleSave} saveLabel="Schedule">
      <div className="form-group">
        <label className="form-label">Meeting Title *</label>
        <input className="form-input" value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Venue walkthrough" />
      </div>
      <div className="form-group">
        <label className="form-label">Time</label>
        <input className="form-input" value={form.time} onChange={e => set('time', e.target.value)} placeholder="e.g. 2:00 PM – 3:00 PM" />
      </div>
      <div className="form-group">
        <label className="form-label">Client / Contact</label>
        <input className="form-input" value={form.client} onChange={e => set('client', e.target.value)} placeholder="Name or company" />
      </div>
      <div className="form-group">
        <label className="form-label">Related Event</label>
        <select className="form-select" value={form.event} onChange={e => set('event', e.target.value)}>
          {events.map(ev => <option key={ev.id}>{ev.name}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Meeting Type</label>
        <select className="form-select" value={form.type} onChange={e => set('type', e.target.value)}>
          <option value="video">Video Call</option>
          <option value="call">Phone Call</option>
          <option value="in-person">In Person</option>
        </select>
      </div>
    </Modal>
  );
}
