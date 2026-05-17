import { LayoutDashboard, CalendarDays, CheckSquare, Users, FileText, Calendar, Mail, CreditCard, BarChart2, Puzzle, Settings, HelpCircle } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'events', label: 'Events', icon: CalendarDays },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'vendors', label: 'Vendors', icon: Users },
  { id: 'templates', label: 'Templates', icon: FileText },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'inbox', label: 'Inbox', icon: Mail },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'reports', label: 'Reports', icon: BarChart2 },
  { id: 'integrations', label: 'Integrations', icon: Puzzle },
];

export default function Sidebar({ activePage, setActivePage, unreadCount, pendingTaskCount }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">✦</div>
        <span className="brand-name">MeetCraft</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
          <div
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
          >
            <Icon size={16} />
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.id === 'inbox' && unreadCount > 0 && (
              <span className="badge badge-purple" style={{ fontSize: 9, padding: '1px 6px' }}>{unreadCount}</span>
            )}
            {item.id === 'tasks' && pendingTaskCount > 0 && (
              <span className="badge badge-soft-purple" style={{ fontSize: 9, padding: '1px 6px' }}>{pendingTaskCount}</span>
            )}
          </div>
        );
        })}
      </nav>

      <div className="sidebar-upgrade">
        <div className="upgrade-icon">🚀</div>
        <div className="upgrade-title">Upgrade to Pro</div>
        <div className="upgrade-sub">Unlock all features and unlimited events</div>
        <button className="upgrade-btn" onClick={() => setActivePage('settings')}>Upgrade Now</button>
      </div>

      <div className="sidebar-bottom">
        <div
          className={`nav-item ${activePage === 'settings' ? 'active' : ''}`}
          onClick={() => setActivePage('settings')}
        >
          <Settings size={16} /> Settings
        </div>
        <div
          className={`nav-item ${activePage === 'support' ? 'active' : ''}`}
          onClick={() => setActivePage('support')}
        >
          <HelpCircle size={16} /> Support
        </div>
      </div>
    </aside>
  );
}
