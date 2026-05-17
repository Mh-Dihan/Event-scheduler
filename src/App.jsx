import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Tasks from './pages/Tasks';
import Vendors from './pages/Vendors';
import Templates from './pages/Templates';
import Calendar from './pages/Calendar';
import Inbox from './pages/Inbox';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import Integrations from './pages/Integrations';
import Settings from './pages/Settings';
import Support from './pages/Support';
import NewEventModal from './components/ui/NewEventModal';
import NewTaskModal from './components/ui/NewTaskModal';
import NewVendorModal from './components/ui/NewVendorModal';
import NewMeetingModal from './components/ui/NewMeetingModal';
import NewPaymentModal from './components/ui/NewPaymentModal';
import ComposeModal from './components/ui/ComposeModal';

const PAGES = {
  dashboard: Dashboard,
  events: Events,
  tasks: Tasks,
  vendors: Vendors,
  templates: Templates,
  calendar: Calendar,
  inbox: Inbox,
  payments: Payments,
  reports: Reports,
  integrations: Integrations,
  settings: Settings,
  support: Support,
};

function AppInner() {
  const [activePage, setActivePage] = useState('dashboard');
  const { modal, unreadCount, pendingTaskCount } = useApp();

  const PageComponent = PAGES[activePage] || Dashboard;

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        unreadCount={unreadCount}
        pendingTaskCount={pendingTaskCount}
      />

      <div className="main-area">
        <Header setActivePage={setActivePage} />
        <div className="content-area">
          <PageComponent setActivePage={setActivePage} />
        </div>
      </div>

      {/* Modals */}
      {modal === 'newEvent' && <NewEventModal />}
      {modal === 'newTask' && <NewTaskModal />}
      {modal === 'newVendor' && <NewVendorModal />}
      {modal === 'newMeeting' && <NewMeetingModal />}
      {modal === 'newPayment' && <NewPaymentModal />}
      {modal === 'compose' && <ComposeModal />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
