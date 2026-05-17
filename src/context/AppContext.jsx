import { createContext, useContext, useEffect, useState } from 'react';
import { events as initEvents, tasks as initTasks, meetings as initMeetings, vendors as initVendors, payments as initPayments, inboxMessages as initInbox } from '../data/mockData';
import { api } from '../lib/api';

const AppContext = createContext(null);
const INVENTORY_DB_KEY = 'inventorydb';

const defaultProfile = {
  name: 'Muhaiminul Hasan Dihan',
  email: 'dihan01632@gmail.com',
  role: 'Event Manager',
  phone: '+880 1711-010000',
  bio: 'Event manager for Bangladeshi weddings, corporate programs, and cultural events.',
};

const defaultInventory = {
  profile: defaultProfile,
  events: initEvents,
  tasks: initTasks,
  meetings: initMeetings,
  vendors: initVendors,
  payments: initPayments,
  inbox: initInbox,
};

function readInventoryDb() {
  if (typeof window === 'undefined') return defaultInventory;

  try {
    const saved = window.localStorage.getItem(INVENTORY_DB_KEY);
    if (!saved) return defaultInventory;
    const parsed = JSON.parse(saved);

    return {
      profile: { ...defaultProfile, ...(parsed.profile || {}) },
      events: Array.isArray(parsed.events) ? parsed.events : initEvents,
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : initTasks,
      meetings: Array.isArray(parsed.meetings) ? parsed.meetings : initMeetings,
      vendors: Array.isArray(parsed.vendors) ? parsed.vendors : initVendors,
      payments: Array.isArray(parsed.payments) ? parsed.payments : initPayments,
      inbox: Array.isArray(parsed.inbox) ? parsed.inbox : initInbox,
    };
  } catch (error) {
    console.warn('Could not read inventorydb. Using starter data instead.', error);
    return defaultInventory;
  }
}

function writeInventoryDb(data) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(INVENTORY_DB_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Could not save inventorydb.', error);
  }
}

export function AppProvider({ children }) {
  const [inventory] = useState(readInventoryDb);
  const [profile, setProfile] = useState(inventory.profile);
  const [events, setEvents] = useState(inventory.events);
  const [tasks, setTasks] = useState(inventory.tasks);
  const [meetings, setMeetings] = useState(inventory.meetings);
  const [vendors, setVendors] = useState(inventory.vendors);
  const [payments, setPayments] = useState(inventory.payments);
  const [inbox, setInbox] = useState(inventory.inbox);
  const [modal, setModal] = useState(null); // 'newEvent' | 'newTask' | 'newVendor' | 'newMeeting'

  useEffect(() => {
    api.getProfile()
      .then(serverProfile => setProfile(prev => ({ ...prev, ...serverProfile })))
      .catch(error => {
        console.warn('Using local profile because backend profile failed to load.', error);
      });
  }, []);

  useEffect(() => {
    writeInventoryDb({ profile, events, tasks, meetings, vendors, payments, inbox });
  }, [profile, events, tasks, meetings, vendors, payments, inbox]);

  const addEvent = (ev) => {
    const newEv = { ...ev, id: Date.now(), progress: 0, daysLeft: Math.ceil((new Date(ev.date) - new Date()) / 86400000) };
    setEvents(prev => [newEv, ...prev]);
  };

  const cancelEvent = (id) => {
    setEvents(prev => prev.filter(ev => ev.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const addTask = (task) => {
    const event = events.find(ev => ev.name === task.event);
    setTasks(prev => [{ ...task, id: Date.now(), eventId: event?.id, done: false }, ...prev]);
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const addVendor = (v) => {
    setVendors(prev => [{ ...v, id: Date.now(), events: [], rating: 0 }, ...prev]);
  };

  const deleteVendor = (id) => {
    setVendors(prev => prev.filter(v => v.id !== id));
  };

  const addMeeting = (m) => {
    setMeetings(prev => [{ ...m, id: Date.now() }, ...prev]);
  };

  const addPayment = (payment) => {
    setPayments(prev => [{ ...payment, id: Date.now(), amount: Number(payment.amount) || 0 }, ...prev]);
  };

  const addInboxMessage = (message) => {
    setInbox(prev => [{ ...message, id: Date.now(), time: 'Just now', unread: false }, ...prev]);
  };

  const markInboxRead = (id) => {
    setInbox(prev => prev.map(m => m.id === id ? { ...m, unread: false } : m));
  };

  const unreadCount = inbox.filter(m => m.unread).length;
  const pendingTaskCount = tasks.filter(t => !t.done).length;

  return (
    <AppContext.Provider value={{
      profile, setProfile,
      events, tasks, meetings, vendors, payments, inbox,
      modal, setModal,
      addEvent, cancelEvent, toggleTask, addTask, deleteTask, addVendor, deleteVendor, addMeeting, addPayment, addInboxMessage, markInboxRead,
      unreadCount, pendingTaskCount
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
