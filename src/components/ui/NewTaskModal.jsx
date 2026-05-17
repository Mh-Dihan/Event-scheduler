import { useState } from 'react';
import Modal from './Modal';
import { useApp } from '../../context/AppContext';

export default function NewTaskModal() {
  const { setModal, addTask, events } = useApp();
  const [form, setForm] = useState({ name: '', event: events[0]?.name || '', priority: 'medium', due: '' });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = () => {
    if (!form.name.trim()) { alert('Please enter a task name.'); return; }
    addTask(form);
    setModal(null);
  };

  return (
    <Modal title="Add New Task" onClose={() => setModal(null)} onSave={handleSave} saveLabel="Add Task">
      <div className="form-group">
        <label className="form-label">Task Name *</label>
        <input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Confirm vendor booking" />
      </div>
      <div className="form-group">
        <label className="form-label">Event</label>
        <select className="form-select" value={form.event} onChange={e => set('event', e.target.value)}>
          {events.map(ev => <option key={ev.id}>{ev.name}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Priority</label>
        <select className="form-select" value={form.priority} onChange={e => set('priority', e.target.value)}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Due Date</label>
        <input className="form-input" type="date" value={form.due} onChange={e => set('due', e.target.value)} />
      </div>
    </Modal>
  );
}
