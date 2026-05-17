import { useState } from 'react';
import { templates } from '../data/mockData';
import { ArrowUpRight, CheckCircle2, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';

const TAG_COLORS = {
  Finance: 'badge-soft-teal',
  'Guest Management': 'badge-soft-purple',
  Vendors: 'badge-soft-blue',
  Planning: 'badge-soft-yellow',
  Legal: 'badge-soft-red',
  Marketing: 'badge-soft-pink',
  Operations: 'badge-soft-blue',
};

const TEMPLATE_TASKS = {
  Finance: ['Create budget categories', 'Add estimated vendor costs', 'Review pending payments'],
  'Guest Management': ['Import guest list', 'Collect RSVP responses', 'Confirm seating groups'],
  Vendors: ['Add vendor contacts', 'Request quotations', 'Review vendor contracts'],
  Planning: ['Create event milestones', 'Assign team responsibilities', 'Confirm final event timeline'],
  Legal: ['Collect vendor agreements', 'Check cancellation terms', 'File signed documents'],
  Marketing: ['Create campaign calendar', 'Prepare social captions', 'Schedule announcement posts'],
  Operations: ['Build run of show', 'Confirm setup checklist', 'Share execution brief with team'],
};

export default function Templates() {
  const { events, addTask } = useApp();
  const [items, setItems] = useState(templates);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [targetEvent, setTargetEvent] = useState(events[0]?.name || '');
  const [applied, setApplied] = useState(null);

  const addTemplate = () => {
    const name = prompt('Template name');
    if (!name?.trim()) return;
    const template = {
      id: Date.now(),
      name: name.trim(),
      tag: 'Planning',
      desc: 'Custom planning template created for this workspace.',
      icon: 'N',
    };
    setItems(prev => [template, ...prev]);
    setSelected(template);
  };

  const filtered = items.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.tag.toLowerCase().includes(search.toLowerCase())
  );

  const applyTemplate = (template) => {
    const event = events.find(ev => ev.name === targetEvent) || events[0];
    if (!event) { alert('Create an event first before using a template.'); return; }
    const checklist = TEMPLATE_TASKS[template.tag] || TEMPLATE_TASKS.Planning;
    checklist.forEach((name, index) => {
      addTask({
        name,
        event: event.name,
        eventId: event.id,
        priority: index === 0 ? 'high' : 'medium',
        due: event.date,
      });
    });
    setApplied(`${template.name} added ${checklist.length} tasks to ${event.name}`);
    setSelected(template);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Templates</h1>
        <button className="btn-primary" onClick={addTemplate}>+ New Template</button>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="search-bar" style={{ background: 'white', flex: 1, minWidth: 220, maxWidth: 380 }}>
          <Search size={14} color="var(--text-light)" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search templates..." />
        </div>
        <select className="form-select" value={targetEvent} onChange={e => setTargetEvent(e.target.value)} style={{ maxWidth: 300 }}>
          {events.map(ev => <option key={ev.id}>{ev.name}</option>)}
        </select>
      </div>
      {applied && <div className="template-success"><CheckCircle2 size={15} /> {applied}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
        {filtered.map(t => (
          <div
            key={t.id}
            onClick={() => setSelected(t)}
            style={{
              background: 'white', borderRadius: 'var(--radius)', border: `1px solid ${selected?.id === t.id ? 'var(--purple)' : 'var(--border-soft)'}`,
              padding: 18, cursor: 'pointer', transition: 'all 0.15s', boxShadow: 'var(--shadow-sm)', position: 'relative'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
          >
            <div style={{ position: 'absolute', top: 14, right: 14, color: 'var(--purple)', opacity: 0.4 }}>
              <ArrowUpRight size={15} />
            </div>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{t.icon}</div>
            <span className={`badge ${TAG_COLORS[t.tag] || 'badge-soft-purple'}`} style={{ marginBottom: 8, display: 'inline-flex' }}>{t.tag}</span>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 5, fontFamily: 'Outfit, sans-serif' }}>{t.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-sec)', lineHeight: 1.5 }}>{t.desc}</div>
            <button
              className="btn-primary"
              style={{ marginTop: 14, padding: '6px 14px', fontSize: 11, width: '100%', justifyContent: 'center' }}
              onClick={e => { e.stopPropagation(); applyTemplate(t); }}
            >
              Use Template
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
