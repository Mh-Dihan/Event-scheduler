import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Star, Phone, Mail, Search, Trash2 } from 'lucide-react';

const STATUS_BADGE = {
  Active: 'badge-soft-teal',
  Confirmed: 'badge-soft-teal',
  Pending: 'badge-soft-yellow',
  'Reply Pending': 'badge-soft-red',
};

export default function Vendors() {
  const { vendors, setModal, deleteVendor } = useApp();
  const [search, setSearch] = useState('');

  const filtered = vendors.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.category.toLowerCase().includes(search.toLowerCase())
  );
  const avgRating = vendors.length ? (vendors.reduce((a, v) => a + (v.rating || 0), 0) / vendors.length).toFixed(1) : '0.0';

  const handleDelete = (vendor) => {
    if (confirm(`Delete vendor "${vendor.name}"?`)) {
      deleteVendor(vendor.id);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Vendors</h1>
        <button className="btn-primary" onClick={() => setModal('newVendor')}>
          <Plus size={14} /> Add Vendor
        </button>
      </div>

      <div className="stats-grid" style={{ marginBottom: 18 }}>
        <div className="stat-card">
          <div className="stat-label">Total Vendors</div>
          <div className="stat-value">{vendors.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active</div>
          <div className="stat-value" style={{ color: 'var(--teal)' }}>
            {vendors.filter(v => v.status === 'Active' || v.status === 'Confirmed').length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending</div>
          <div className="stat-value" style={{ color: 'var(--orange)' }}>
            {vendors.filter(v => v.status === 'Pending' || v.status === 'Reply Pending').length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Rating</div>
          <div className="stat-value" style={{ color: 'var(--yellow)' }}>
            {avgRating}
          </div>
        </div>
      </div>

      <div className="search-bar" style={{ background: 'white', marginBottom: 16, maxWidth: 380 }}>
        <Search size={14} color="var(--text-light)" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search vendors..." />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {filtered.map(v => (
          <div key={v.id} className="vendor-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 3, fontFamily: 'Outfit, sans-serif' }}>
                  {v.name}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-sec)' }}>{v.category}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className={`badge ${STATUS_BADGE[v.status] || 'badge-soft-purple'}`}>{v.status}</span>
                <button className="icon-danger-btn" title="Delete vendor" onClick={() => handleDelete(v)}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            {v.rating > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} fill={i < Math.floor(v.rating) ? '#fdcb6e' : 'none'} color="#fdcb6e" />
                ))}
                <span style={{ fontSize: 11, color: 'var(--text-sec)' }}>{v.rating}</span>
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--border-soft)', paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--text-sec)' }}>
                <Mail size={11} /> {v.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--text-sec)' }}>
                <Phone size={11} /> {v.phone}
              </div>
            </div>

            {v.events?.length > 0 && (
              <div style={{ marginTop: 10, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {v.events.map((ev, i) => (
                  <span key={i} className="badge badge-soft-purple" style={{ fontSize: 9 }}>{ev}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
