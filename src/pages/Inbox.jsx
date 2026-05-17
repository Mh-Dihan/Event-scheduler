import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Mail, MailOpen } from 'lucide-react';

const TAG_COLORS = {
  Wedding: 'badge-soft-purple',
  Alert: 'badge-soft-red',
  Birthday: 'badge-soft-pink',
  Vendor: 'badge-soft-teal',
  Sent: 'badge-soft-blue',
  Payment: 'badge-soft-yellow',
};

export default function Inbox() {
  const { inbox, markInboxRead, addInboxMessage, setModal } = useApp();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const [reply, setReply] = useState('');

  const filtered = inbox.filter(m => {
    if (filter === 'unread') return m.unread;
    return true;
  }).filter(m =>
    m.subject.toLowerCase().includes(search.toLowerCase()) ||
    m.from.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (msg) => {
    setSelected(msg);
    setReply('');
    if (msg.unread) markInboxRead(msg.id);
  };

  const handleReply = () => {
    if (!selected || !reply.trim()) { alert('Please write a reply first.'); return; }
    addInboxMessage({
      from: `To: ${selected.from.replace('To: ', '')}`,
      subject: `Re: ${selected.subject}`,
      preview: reply,
      tag: 'Sent',
    });
    setReply('');
    alert('Reply sent.');
  };

  const unread = inbox.filter(m => m.unread).length;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Inbox {unread > 0 && <span className="badge badge-purple" style={{ fontSize: 12, verticalAlign: 'middle' }}>{unread}</span>}</h1>
        <button className="btn-primary" onClick={() => setModal('compose')}>+ Compose</button>
      </div>

      <div className="inbox-layout">
        {/* Message List */}
        <div className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: 0 }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-soft)', display: 'flex', gap: 10, alignItems: 'center' }}>
            <div className="search-bar" style={{ background: 'var(--bg)', flex: 1 }}>
              <Search size={14} color="var(--text-light)" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." />
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {['all', 'unread'].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: '5px 10px', borderRadius: 16, border: '1px solid var(--border)',
                  background: filter === f ? 'var(--purple)' : 'none',
                  color: filter === f ? 'white' : 'var(--text-sec)',
                  cursor: 'pointer', fontSize: 11, fontFamily: 'DM Sans, sans-serif',
                  fontWeight: filter === f ? 600 : 400, textTransform: 'capitalize'
                }}>{f}</button>
              ))}
            </div>
          </div>

          <div style={{ overflowY: 'auto', flex: 1 }}>
            {filtered.map(msg => (
              <div
                key={msg.id}
                onClick={() => handleSelect(msg)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px',
                  borderBottom: '1px solid var(--border-soft)', cursor: 'pointer',
                  background: selected?.id === msg.id ? 'var(--purple-pale)' : msg.unread ? 'rgba(108,92,231,0.03)' : 'white',
                  transition: 'background 0.1s'
                }}
                onMouseEnter={e => { if (selected?.id !== msg.id) e.currentTarget.style.background = 'var(--bg)'; }}
                onMouseLeave={e => { if (selected?.id !== msg.id) e.currentTarget.style.background = msg.unread ? 'rgba(108,92,231,0.03)' : 'white'; }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, var(--purple-light), var(--pink))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 12, fontWeight: 700
                }}>
                  {msg.from[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 12, fontWeight: msg.unread ? 700 : 500, color: 'var(--text)' }}>{msg.from}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-light)', flexShrink: 0 }}>{msg.time}</span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: msg.unread ? 600 : 400, color: 'var(--text)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {msg.subject}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-sec)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {msg.preview}
                  </div>
                </div>
                {msg.unread && <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--purple)', flexShrink: 0, marginTop: 6 }} />}
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: 30, color: 'var(--text-sec)', fontSize: 12 }}>No messages found.</div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="card" style={{ overflow: 'auto' }}>
          {selected ? (
            <>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 18, color: 'var(--text)', lineHeight: 1.3 }}>
                    {selected.subject}
                  </h2>
                  <span className={`badge ${TAG_COLORS[selected.tag] || 'badge-soft-purple'}`}>{selected.tag}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--purple-light), var(--pink))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: 12, fontWeight: 700
                  }}>{selected.from[0]}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{selected.from}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-sec)' }}>{selected.time}</div>
                  </div>
                </div>
              </div>
              <div style={{ borderTop: '1px solid var(--border-soft)', paddingTop: 16, fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>
                <p>{selected.preview}</p>
                <p style={{ marginTop: 12, color: 'var(--text-sec)' }}>
                  Please let me know if you need any additional information or have questions about the upcoming event planning. Looking forward to working with you!
                </p>
                <p style={{ marginTop: 12, color: 'var(--text-sec)' }}>Best regards,<br />{selected.from}</p>
              </div>
              <div style={{ marginTop: 20, borderTop: '1px solid var(--border-soft)', paddingTop: 16 }}>
                <textarea
                  className="form-textarea"
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  placeholder="Write a reply..."
                  style={{ marginBottom: 10 }}
                />
                <button className="btn-primary" onClick={handleReply}>Send Reply</button>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <MailOpen size={48} strokeWidth={1} />
              <h3>Select a message</h3>
              <p>Choose a message from the list to read it here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
