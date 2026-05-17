import { useState } from 'react';
import { CheckCircle2, PlugZap, RefreshCw } from 'lucide-react';
import { integrations } from '../data/mockData';

export default function Integrations() {
  const [connected, setConnected] = useState(
    Object.fromEntries(integrations.map(i => [i.id, i.status === 'connected']))
  );
  const [lastSync, setLastSync] = useState(
    Object.fromEntries(integrations.filter(i => i.status === 'connected').map(i => [i.id, 'Ready to sync']))
  );

  const toggle = (id) => {
    setConnected(prev => {
      const nextValue = !prev[id];
      setLastSync(sync => ({ ...sync, [id]: nextValue ? 'Connected just now' : 'Disconnected' }));
      return { ...prev, [id]: nextValue };
    });
  };

  const sync = (id) => {
    if (!connected[id]) { alert('Connect this integration before syncing.'); return; }
    setLastSync(prev => ({
      ...prev,
      [id]: `Synced ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
    }));
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Integrations</h1>
        <span className="badge badge-soft-teal" style={{ fontSize: 12, padding: '4px 10px' }}>
          {Object.values(connected).filter(Boolean).length} Connected
        </span>
      </div>

      <p style={{ fontSize: 13, color: 'var(--text-sec)', marginBottom: 20, maxWidth: 520 }}>
        Connect your tools, disconnect them, and run a manual sync from here.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {integrations.map(int => (
          <div key={int.id} className="integration-card" style={{ alignItems: 'stretch', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
                <div style={{ fontSize: 22, lineHeight: 1, width: 42, height: 42, borderRadius: 10, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple)', fontWeight: 700 }}>{int.icon}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', fontFamily: 'Outfit, sans-serif' }}>
                    {int.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-sec)' }}>{int.desc}</div>
                </div>
              </div>
              <button
                onClick={() => toggle(int.id)}
                className={`btn-connect ${connected[int.id] ? 'connected' : 'pending'}`}
              >
                {connected[int.id] ? 'Disconnect' : 'Connect'}
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center', marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-soft)' }}>
              <span className={`integration-status ${connected[int.id] ? 'on' : 'off'}`}>
                {connected[int.id] ? <CheckCircle2 size={13} /> : <PlugZap size={13} />}
                {lastSync[int.id] || 'Not connected'}
              </span>
              <button className="icon-soft-btn" title="Sync now" onClick={() => sync(int.id)}>
                <RefreshCw size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
