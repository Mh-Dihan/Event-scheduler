import { useState } from 'react';
import { Search, Bell, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Header({ setActivePage }) {
  const { unreadCount, setModal, profile } = useApp();
  const [search, setSearch] = useState('');
  const initials = profile.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase();

  return (
    <header className="header">
      <div className="search-bar">
        <Search size={14} color="var(--text-light)" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search events, tasks, vendors..."
        />
      </div>

      <div className="header-right">
        <button className="btn-primary" onClick={() => setModal('newEvent')}>
          <Plus size={14} /> New Event
        </button>

        <div className="icon-btn" onClick={() => setActivePage('inbox')} title="Notifications">
          <Bell size={16} />
          {unreadCount > 0 && <div className="notif-dot" />}
        </div>

        <div className="user-chip" onClick={() => setActivePage('settings')}>
          <div className="user-avatar">{initials}</div>
          <div className="user-info">
            <div className="name">{profile.name}</div>
            <div className="role">{profile.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
