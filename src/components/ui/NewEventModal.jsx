import { useState } from 'react';
import Modal from './Modal';
import { useApp } from '../../context/AppContext';

const typeColors = {
  Wedding: { color: '#6C5CE7', color2: '#a29bfe', bg: 'linear-gradient(135deg,#faf8ff,#f0eeff)' },
  Birthday: { color: '#fd79a8', color2: '#e84393', bg: 'linear-gradient(135deg,#fff5f8,#ffe8f1)' },
  Charity: { color: '#00b894', color2: '#00cec9', bg: 'linear-gradient(135deg,#f0fdf8,#e0faf3)' },
  Corporate: { color: '#74b9ff', color2: '#0984e3', bg: 'linear-gradient(135deg,#eff6ff,#dbeafe)' },
  Other: { color: '#fdcb6e', color2: '#e17055', bg: 'linear-gradient(135deg,#fffbf0,#fff5d6)' },
};

export default function NewEventModal() {
  const { setModal, addEvent } = useApp();
  const [form, setForm] = useState({ name: '', type: 'Wedding', date: '', venue: '', client: '', budget: '' });

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = () => {
    if (!form.name.trim()) { alert('Please enter an event name.'); return; }
    const tc = typeColors[form.type] || typeColors.Other;
    addEvent({
      ...form,
      ...tc,
      initials: form.name.split(' ').slice(0, 2).map(w => w[0]),
      budget: parseFloat(form.budget) || 0,
      spent: 0,
      guests: 0,
      daysLeft: form.date ? Math.ceil((new Date(form.date) - new Date()) / 86400000) : 30,
    });
    setModal(null);
  };

  return (
    <Modal title="Create New Event" onClose={() => setModal(null)} onSave={handleSave} saveLabel="Create Event">
      <div className="form-group">
        <label className="form-label">Event Name *</label>
        <input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Nusrat & Arif's Wedding" />
      </div>
      <div className="form-group">
        <label className="form-label">Event Type</label>
        <select className="form-select" value={form.type} onChange={e => set('type', e.target.value)}>
          {Object.keys(typeColors).map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Date</label>
        <input className="form-input" type="date" value={form.date} onChange={e => set('date', e.target.value)} />
      </div>
      <div className="form-group">
        <label className="form-label">Venue</label>
        <input className="form-input" value={form.venue} onChange={e => set('venue', e.target.value)} placeholder="Venue name & city in Bangladesh" />
      </div>
      <div className="form-group">
        <label className="form-label">Client Name</label>
        <input className="form-input" value={form.client} onChange={e => set('client', e.target.value)} placeholder="Client's full name" />
      </div>
      <div className="form-group">
        <label className="form-label">Budget (BDT)</label>
        <input className="form-input" type="number" value={form.budget} onChange={e => set('budget', e.target.value)} placeholder="e.g. 2500000" />
      </div>
    </Modal>
  );
}
