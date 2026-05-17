import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, TrendingUp, TrendingDown, Clock } from 'lucide-react';

const STATUS_STYLE = {
  paid: { badge: 'badge-soft-teal', label: 'Paid', sign: '+', color: 'var(--teal)' },
  pending: { badge: 'badge-soft-yellow', label: 'Pending', sign: '', color: 'var(--yellow)' },
  declined: { badge: 'badge-soft-red', label: 'Declined', sign: '-', color: 'var(--red)' },
};

export default function Payments() {
  const { payments, setModal } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = payments.filter(p => {
    if (filter !== 'all' && p.status !== filter) return false;
    return p.desc.toLowerCase().includes(search.toLowerCase());
  });

  const total = payments.filter(p => p.status === 'paid').reduce((a, p) => a + p.amount, 0);
  const pending = payments.filter(p => p.status === 'pending').reduce((a, p) => a + p.amount, 0);
  const declined = payments.filter(p => p.status === 'declined').reduce((a, p) => a + p.amount, 0);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Payments</h1>
        <button className="btn-primary" onClick={() => setModal('newPayment')}>+ Record Payment</button>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card" style={{ borderTop: '3px solid var(--teal)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <TrendingUp size={14} color="var(--teal)" />
            <div className="stat-label" style={{ margin: 0 }}>Total Collected</div>
          </div>
          <div className="stat-value" style={{ color: 'var(--teal)' }}>BDT {total.toLocaleString()}</div>
        </div>
        <div className="stat-card" style={{ borderTop: '3px solid var(--yellow)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <Clock size={14} color="var(--yellow)" />
            <div className="stat-label" style={{ margin: 0 }}>Pending</div>
          </div>
          <div className="stat-value" style={{ color: 'var(--orange)' }}>BDT {pending.toLocaleString()}</div>
        </div>
        <div className="stat-card" style={{ borderTop: '3px solid var(--red)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <TrendingDown size={14} color="var(--red)" />
            <div className="stat-label" style={{ margin: 0 }}>Declined</div>
          </div>
          <div className="stat-value" style={{ color: 'var(--red)' }}>BDT {declined.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Transactions</div>
          <div className="stat-value">{payments.length}</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="search-bar" style={{ background: 'white', flex: 1, minWidth: 200 }}>
          <Search size={14} color="var(--text-light)" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search payments..." />
        </div>
        {['all', 'paid', 'pending', 'declined'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '6px 14px', borderRadius: 20, border: '1px solid var(--border)',
            background: filter === f ? 'var(--purple)' : 'white',
            color: filter === f ? 'white' : 'var(--text-sec)',
            cursor: 'pointer', fontSize: 12, fontFamily: 'DM Sans, sans-serif',
            fontWeight: filter === f ? 600 : 400, textTransform: 'capitalize', transition: 'all 0.15s'
          }}>{f}</button>
        ))}
      </div>

      {/* Table */}
      <div className="card table-scroll" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Event</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const s = STATUS_STYLE[p.status];
              return (
                <tr key={p.id}>
                  <td>{p.desc}</td>
                  <td style={{ color: 'var(--purple)', fontSize: 11 }}>{p.event}</td>
                  <td style={{ color: 'var(--text-sec)' }}>{p.date}</td>
                  <td style={{ fontWeight: 700, color: s.color }}>
                    {s.sign}BDT {p.amount.toLocaleString()}
                  </td>
                  <td><span className={`badge ${s.badge}`}>{s.label}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 30, color: 'var(--text-sec)', fontSize: 12 }}>No payments found.</div>
        )}
      </div>
    </div>
  );
}
