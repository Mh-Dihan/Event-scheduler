import { useState } from 'react';
import Modal from './Modal';
import { useApp } from '../../context/AppContext';

export default function NewVendorModal() {
  const { setModal, addVendor } = useApp();
  const [form, setForm] = useState({ name: '', category: '', contact: '', email: '', phone: '', status: 'Pending' });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = () => {
    if (!form.name.trim()) { alert('Please enter vendor name.'); return; }
    addVendor(form);
    setModal(null);
  };

  return (
    <Modal title="Add New Vendor" onClose={() => setModal(null)} onSave={handleSave} saveLabel="Add Vendor">
      <div className="form-group">
        <label className="form-label">Vendor Name *</label>
        <input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Gulshan Decor Studio" />
      </div>
      <div className="form-group">
        <label className="form-label">Category</label>
        <input className="form-input" value={form.category} onChange={e => set('category', e.target.value)} placeholder="e.g. Florals & Decor" />
      </div>
      <div className="form-group">
        <label className="form-label">Contact Person</label>
        <input className="form-input" value={form.contact} onChange={e => set('contact', e.target.value)} placeholder="Full name" />
      </div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input className="form-input" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="vendor@email.com" />
      </div>
      <div className="form-group">
        <label className="form-label">Phone</label>
        <input className="form-input" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+880 1711-000000" />
      </div>
      <div className="form-group">
        <label className="form-label">Status</label>
        <select className="form-select" value={form.status} onChange={e => set('status', e.target.value)}>
          <option>Pending</option><option>Active</option><option>Confirmed</option>
        </select>
      </div>
    </Modal>
  );
}
