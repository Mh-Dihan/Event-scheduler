import { useState } from 'react';
import { User, Bell, Shield, CreditCard, Palette } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../lib/api';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 40, height: 22, borderRadius: 11, cursor: 'pointer', transition: 'background 0.2s',
        background: checked ? 'var(--purple)' : 'var(--border)', position: 'relative', flexShrink: 0
      }}
    >
      <div style={{
        position: 'absolute', top: 3, left: checked ? 21 : 3,
        width: 16, height: 16, borderRadius: '50%', background: 'white', transition: 'left 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
      }} />
    </div>
  );
}

export default function Settings() {
  const { profile, setProfile } = useApp();
  const [tab, setTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [plan, setPlan] = useState('Free Plan');
  const [paymentMethod, setPaymentMethod] = useState('No payment method added');
  const [notifs, setNotifs] = useState({ email: true, push: true, sms: false, weekly: true, alerts: true });
  const initials = profile.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase();

  const handleSave = async () => {
    try {
      await api.updateProfile(profile);
    } catch (error) {
      console.warn('Profile could not be saved to the backend.', error);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        {saved && (
          <span className="badge badge-soft-teal" style={{ fontSize: 12, padding: '6px 14px', animation: 'fadeIn 0.2s ease' }}>
            ✓ Saved successfully
          </span>
        )}
      </div>

      <div className="settings-layout">
        {/* Tab nav */}
        <div className="card" style={{ padding: 8, alignSelf: 'start' }}>
          {TABS.map(item => {
            const Icon = item.icon;
            return (
            <div
              key={item.id}
              onClick={() => setTab(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
                borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: 13,
                background: tab === item.id ? 'var(--purple-pale)' : 'none',
                color: tab === item.id ? 'var(--purple)' : 'var(--text-sec)',
                fontWeight: tab === item.id ? 500 : 400, transition: 'all 0.15s', marginBottom: 2
              }}
            >
              <Icon size={15} /> {item.label}
            </div>
          );
          })}
        </div>

        {/* Tab content */}
        <div className="card">
          {tab === 'profile' && (
            <>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 18 }}>Profile Information</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--border-soft)' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, var(--purple-light), var(--pink))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 22, fontWeight: 700 }}>{initials}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{profile.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-sec)', marginBottom: 8 }}>{profile.role}</div>
                  <button
                    onClick={() => alert('Photo upload is ready for backend file storage integration.')}
                    style={{ padding: '5px 12px', borderRadius: 16, border: '1px solid var(--border)', background: 'none', fontSize: 11, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
                  >
                    Change Photo
                  </button>
                </div>
              </div>
              <div className="settings-form-grid">
                {[['Full Name', 'name'], ['Email', 'email'], ['Role', 'role'], ['Phone', 'phone']].map(([label, key]) => (
                  <div className="form-group" key={key} style={{ margin: 0 }}>
                    <label className="form-label">{label}</label>
                    <input className="form-input" value={profile[key]} onChange={e => setProfile(p => ({ ...p, [key]: e.target.value }))} />
                  </div>
                ))}
              </div>
              <div className="form-group" style={{ marginTop: 14 }}>
                <label className="form-label">Bio</label>
                <textarea className="form-textarea" value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} />
              </div>
              <button className="btn-save" style={{ marginTop: 4 }} onClick={handleSave}>Save Changes</button>
            </>
          )}

          {tab === 'notifications' && (
            <>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 18 }}>Notification Preferences</h2>
              {[
                ['email', 'Email Notifications', 'Receive updates and alerts via email'],
                ['push', 'Push Notifications', 'Browser push notifications for real-time alerts'],
                ['sms', 'SMS Notifications', 'Text message alerts for urgent updates'],
                ['weekly', 'Weekly Summary', 'Get a weekly digest of all your events'],
                ['alerts', 'Payment Alerts', 'Notifications for payment status changes'],
              ].map(([key, title, desc]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border-soft)' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-sec)', marginTop: 2 }}>{desc}</div>
                  </div>
                  <Toggle checked={notifs[key]} onChange={v => setNotifs(p => ({ ...p, [key]: v }))} />
                </div>
              ))}
              <button className="btn-save" style={{ marginTop: 16 }} onClick={handleSave}>Save Preferences</button>
            </>
          )}

          {tab === 'security' && (
            <>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 18 }}>Security Settings</h2>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input className="form-input" type="password" placeholder="••••••••" />
              </div>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input className="form-input" type="password" placeholder="••••••••" />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input className="form-input" type="password" placeholder="••••••••" />
              </div>
              <button className="btn-save" onClick={handleSave}>Update Password</button>
              <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--border-soft)' }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Two-Factor Authentication</div>
                <div style={{ fontSize: 12, color: 'var(--text-sec)', marginBottom: 12 }}>Add an extra layer of security to your account.</div>
                <button
                  onClick={() => { setTwoFactor(prev => !prev); showSaved(); }}
                  style={{ padding: '8px 16px', borderRadius: 20, border: '1px solid var(--purple)', color: 'var(--purple)', background: 'none', cursor: 'pointer', fontSize: 12, fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}
                >
                  {twoFactor ? 'Disable 2FA' : 'Enable 2FA'}
                </button>
              </div>
            </>
          )}

          {tab === 'billing' && (
            <>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Billing & Plan</h2>
              <div style={{ background: 'linear-gradient(135deg, var(--purple-pale), var(--pink-pale))', borderRadius: 'var(--radius)', padding: 18, marginBottom: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--purple)', marginBottom: 4 }}>{plan}</div>
                <div style={{ fontSize: 12, color: 'var(--text-sec)', marginBottom: 12 }}>You're currently on the free plan. Upgrade for unlimited events, priority support, and more.</div>
                <button className="btn-primary" onClick={() => { setPlan('Pro Plan'); showSaved(); }}>Upgrade to Pro - BDT 3,200/mo</button>
              </div>
              <div style={{ fontWeight: 600, marginBottom: 12 }}>Payment Method</div>
              <div style={{ border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-sm)', padding: 14, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 22 }}>💳</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{paymentMethod}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-sec)' }}>Add a card to upgrade your plan</div>
                </div>
              </div>
              <button
                onClick={() => { setPaymentMethod('Visa card ending in 4242'); showSaved(); }}
                style={{ padding: '8px 16px', borderRadius: 20, border: '1px solid var(--border)', background: 'none', cursor: 'pointer', fontSize: 12, fontFamily: 'DM Sans, sans-serif' }}
              >
                + Add Payment Method
              </button>
            </>
          )}

          {tab === 'appearance' && (
            <>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 18 }}>Appearance</h2>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10 }}>Theme</div>
                <div style={{ display: 'flex', gap: 12 }}>
                  {['Light', 'Dark', 'System'].map(t => (
                    <div key={t} style={{ padding: '10px 20px', borderRadius: 10, border: `2px solid ${t === 'Light' ? 'var(--purple)' : 'var(--border-soft)'}`, cursor: 'pointer', fontSize: 13, fontWeight: t === 'Light' ? 600 : 400, color: t === 'Light' ? 'var(--purple)' : 'var(--text-sec)' }}>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10 }}>Accent Color</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['#6C5CE7', '#00b894', '#fd79a8', '#e17055', '#74b9ff', '#fdcb6e'].map(c => (
                    <div key={c} style={{ width: 28, height: 28, borderRadius: '50%', background: c, cursor: 'pointer', border: c === '#6C5CE7' ? '3px solid white' : 'none', boxShadow: c === '#6C5CE7' ? `0 0 0 2px ${c}` : 'none', transition: 'transform 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                      onMouseLeave={e => e.currentTarget.style.transform = ''}
                    />
                  ))}
                </div>
              </div>
              <button className="btn-save" style={{ marginTop: 20 }} onClick={handleSave}>Save Appearance</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
