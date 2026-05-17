import { useState } from 'react';
import { MessageCircle, BookOpen, Video, Mail } from 'lucide-react';
import { api } from '../lib/api';

const FAQS = [
  { q: 'How do I create a new event?', a: 'Click the "+ New Event" button in the top right header or sidebar to open the event creation form.' },
  { q: 'Can I invite team members to collaborate?', a: 'Team collaboration is available on the Pro plan. Upgrade to add unlimited team members and set permissions.' },
  { q: 'How do I track vendor payments?', a: 'Go to the Payments page to view, record, and track all vendor and client payments. Filter by status to find pending or declined payments.' },
  { q: 'Can I export reports to PDF?', a: 'Yes! Visit the Reports page and click the "Export PDF" button to download a full report of your events and financials.' },
  { q: 'How do I connect Google Calendar?', a: 'Go to Integrations and click "Connect" next to Google Calendar. You\'ll be prompted to authorize access to your calendar.' },
];

export default function Support() {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ subject: '', message: '', type: 'question' });
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!form.subject || !form.message) { alert('Please fill in all fields.'); return; }
    try {
      await api.sendSupportMessage(form);
    } catch (error) {
      console.warn('Support message could not be saved to the backend.', error);
    }
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ subject: '', message: '', type: 'question' });
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Support</h1>
      </div>

      {/* Quick links */}
      <div className="support-links-grid">
        {[
          { icon: <BookOpen size={22} />, title: 'Documentation', desc: 'Browse our full docs', color: 'var(--purple-pale)', tc: 'var(--purple)', action: () => alert('Documentation center opened.') },
          { icon: <Video size={22} />, title: 'Video Tutorials', desc: 'Watch how-to guides', color: 'var(--pink-pale)', tc: '#9d174d', action: () => alert('Video tutorials opened.') },
          { icon: <MessageCircle size={22} />, title: 'Live Chat', desc: 'Chat with our team', color: 'var(--teal-pale)', tc: '#065f46', action: () => alert('Live chat started.') },
          { icon: <Mail size={22} />, title: 'Email Support', desc: 'support@meetcraft.io', color: 'var(--yellow-pale)', tc: '#92400e', action: () => window.location.href = 'mailto:support@meetcraft.io' },
        ].map((item, i) => (
          <div key={i} onClick={item.action} style={{ background: 'white', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius)', padding: 16, cursor: 'pointer', transition: 'all 0.15s', boxShadow: 'var(--shadow-sm)' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 12, background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.tc, marginBottom: 10 }}>
              {item.icon}
            </div>
            <div style={{ fontWeight: 700, fontSize: 13, fontFamily: 'Outfit, sans-serif', marginBottom: 3 }}>{item.title}</div>
            <div style={{ fontSize: 11, color: 'var(--text-sec)' }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <div className="support-content-grid">
        {/* FAQ */}
        <div className="card">
          <div className="card-header" style={{ marginBottom: 16 }}>
            <div className="card-title">Frequently Asked Questions</div>
          </div>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--border-soft)', paddingBottom: openFaq === i ? 12 : 0 }}>
              <div
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}
              >
                {faq.q}
                <span style={{ fontSize: 18, color: 'var(--text-sec)', flexShrink: 0, marginLeft: 8, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
              </div>
              {openFaq === i && (
                <div style={{ fontSize: 12, color: 'var(--text-sec)', lineHeight: 1.6, paddingBottom: 4 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="card">
          <div className="card-header" style={{ marginBottom: 16 }}>
            <div className="card-title">Contact Support</div>
            {sent && <span className="badge badge-soft-teal">✓ Message sent!</span>}
          </div>
          <div className="form-group">
            <label className="form-label">Issue Type</label>
            <select className="form-select" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
              <option value="question">General Question</option>
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="billing">Billing Issue</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Subject</label>
            <input className="form-input" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} placeholder="Briefly describe your issue..." />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea className="form-textarea" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Please provide as much detail as possible..." />
          </div>
          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleSend}>
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
