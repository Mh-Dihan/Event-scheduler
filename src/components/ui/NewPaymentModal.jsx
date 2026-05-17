import { useState } from 'react';
import Modal from './Modal';
import { useApp } from '../../context/AppContext';

export default function NewPaymentModal() {
  const { setModal, addPayment, events } = useApp();
  const [form, setForm] = useState({
    desc: '',
    event: events[0]?.name || '',
    date: new Date().toISOString().slice(0, 10),
    amount: '',
    status: 'paid',
  });
  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    if (!form.desc.trim()) { alert('Please enter a payment description.'); return; }
    if (!form.amount || Number(form.amount) <= 0) { alert('Please enter a valid amount.'); return; }
    addPayment(form);
    setModal(null);
  };

  return (
    <Modal title="Record Payment" onClose={() => setModal(null)} onSave={handleSave} saveLabel="Record Payment">
      <div className="form-group">
        <label className="form-label">Description *</label>
        <input className="form-input" value={form.desc} onChange={e => set('desc', e.target.value)} placeholder="e.g. Venue advance payment" />
      </div>
      <div className="form-group">
        <label className="form-label">Event</label>
        <select className="form-select" value={form.event} onChange={e => set('event', e.target.value)}>
          {events.map(ev => <option key={ev.id}>{ev.name}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Date</label>
        <input className="form-input" type="date" value={form.date} onChange={e => set('date', e.target.value)} />
      </div>
      <div className="form-group">
        <label className="form-label">Amount (BDT) *</label>
        <input className="form-input" type="number" value={form.amount} onChange={e => set('amount', e.target.value)} placeholder="e.g. 150000" />
      </div>
      <div className="form-group">
        <label className="form-label">Status</label>
        <select className="form-select" value={form.status} onChange={e => set('status', e.target.value)}>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="declined">Declined</option>
        </select>
      </div>
    </Modal>
  );
}
