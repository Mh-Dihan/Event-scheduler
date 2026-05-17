import { useState } from 'react';
import { useApp } from '../context/AppContext';
import ProgressBar from '../components/ui/ProgressBar';
import { Plus, Search, Users, DollarSign, Calendar, XCircle } from 'lucide-react';

const TYPE_BADGE = {
  Wedding: 'badge-soft-purple',
  Birthday: 'badge-soft-pink',
  Charity: 'badge-soft-teal',
  Corporate: 'badge-soft-blue',
  Other: 'badge-soft-yellow',
};

export default function Events() {
  const { events, setModal, cancelEvent } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const types = ['All', 'Wedding', 'Birthday', 'Charity', 'Corporate', 'Other'];
  const filtered = events.filter(ev =>
    (filter === 'All' || ev.type === filter) &&
    ev.name.toLowerCase().includes(search.toLowerCase())
  );
  const avgProgress = events.length ? Math.round(events.reduce((a, e) => a + e.progress, 0) / events.length) : 0;

  const handleCancelEvent = (event) => {
    if (confirm(`Cancel and remove "${event.name}" from events? Other sections will stay saved.`)) {
      cancelEvent(event.id);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Events</h1>
        <button className="btn-primary" onClick={() => setModal('newEvent')}>
          <Plus size={14} /> New Event
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="search-bar" style={{ background: 'white', flex: 1, minWidth: 200 }}>
          <Search size={14} color="var(--text-light)" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events..." />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {types.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              style={{
                padding: '6px 12px', borderRadius: 20, border: '1px solid var(--border)',
                background: filter === t ? 'var(--purple)' : 'white',
                color: filter === t ? 'white' : 'var(--text-sec)',
                cursor: 'pointer', fontSize: 12, fontWeight: filter === t ? 600 : 400,
                fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s'
              }}
            >{t}</button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 18 }}>
        <div className="stat-card">
          <div className="stat-label">Total Events</div>
          <div className="stat-value" style={{ color: 'var(--purple)' }}>{events.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Guests</div>
          <div className="stat-value">{events.reduce((a, e) => a + e.guests, 0)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Budget</div>
          <div className="stat-value">BDT {events.reduce((a, e) => a + e.budget, 0).toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Progress</div>
          <div className="stat-value" style={{ color: 'var(--teal)' }}>
            {avgProgress}%
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="events-grid">
        {filtered.map(ev => (
          <div key={ev.id} className="event-full-card" style={{ borderTop: `3px solid ${ev.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span className={`badge ${TYPE_BADGE[ev.type] || 'badge-soft-purple'}`}>{ev.type.toUpperCase()}</span>
              <span style={{ fontSize: 10, color: 'var(--text-sec)' }}>{ev.daysLeft} days left</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 4, fontFamily: 'Outfit, sans-serif' }}>
              {ev.name}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-sec)', marginBottom: 12 }}>
              {ev.date} · {ev.venue}
            </div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-sec)' }}>
                <Users size={12} /> {ev.guests} guests
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-sec)' }}>
                <DollarSign size={12} /> BDT {ev.budget.toLocaleString()}
              </div>
            </div>
            <div className="event-card-actions">
              <ProgressBar value={ev.progress} color={ev.color} color2={ev.color2} />
              <button className="btn-danger-outline" onClick={() => handleCancelEvent(ev)} style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}>
                <XCircle size={13} /> Cancel Event
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-sec)' }}>
            No events found. <span style={{ color: 'var(--purple)', cursor: 'pointer' }} onClick={() => setModal('newEvent')}>Create one?</span>
          </div>
        )}
      </div>
    </div>
  );
}
