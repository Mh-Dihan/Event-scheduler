import { useApp } from '../context/AppContext';
import ProgressBar from '../components/ui/ProgressBar';
import { Plus, X } from 'lucide-react';
import { alerts, templates } from '../data/mockData';
import { ArrowUpRight } from 'lucide-react';

const DONUT_COLORS = ['#6C5CE7', '#fd79a8', '#00b894', '#fdcb6e'];
const CIRCUMFERENCE = 2 * Math.PI * 44;

function DonutChart({ events }) {
  const total = events.length || 1;
  const segments = events.map((ev, i) => {
    const dash = CIRCUMFERENCE / total;
    return { color: ev.color, dash, offset: i * dash };
  });

  return (
    <div className="donut-container">
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r="44" fill="none" stroke="#f0eeff" strokeWidth="13" />
        {segments.map((s, i) => (
          <circle key={i} cx="55" cy="55" r="44" fill="none"
            stroke={s.color} strokeWidth="13"
            strokeDasharray={`${s.dash - 2} ${CIRCUMFERENCE - s.dash + 2}`}
            strokeDashoffset={-s.offset + CIRCUMFERENCE / 4}
            strokeLinecap="round"
            transform="rotate(-90 55 55)"
          />
        ))}
      </svg>
      <div className="donut-center">
        <div className="donut-num">{events.length}</div>
        <div className="donut-label">events</div>
      </div>
    </div>
  );
}

function MeetingIcon({ type }) {
  const icons = { video: '🎥', call: '📞', 'in-person': '🤝' };
  const colors = { video: '#e3f2fd', call: '#fce4ec', 'in-person': '#e8f5e9' };
  return (
    <div className="meeting-icon" style={{ background: colors[type] || '#f5f5f5' }}>
      {icons[type] || '📅'}
    </div>
  );
}

export default function Dashboard({ setActivePage }) {
  const { events, tasks, meetings, setModal, toggleTask, cancelEvent } = useApp();
  const todayTasks = tasks.slice(0, 4);
  const todayMeetings = meetings.slice(0, 3);
  const pendingCount = tasks.filter(t => !t.done).length;

  return (
    <div className="dash-grid">
      {/* TODAY'S TASKS */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            Today's Tasks
            <span className="badge badge-purple">{pendingCount}</span>
          </div>
          <span className="see-all" onClick={() => setActivePage('tasks')}>See All</span>
        </div>
        {todayTasks.map(task => (
          <div key={task.id} className="task-item">
            <div
              className={`task-check ${task.done ? 'done' : ''}`}
              onClick={() => toggleTask(task.id)}
            />
            <div className="task-body">
              <div className={`task-name ${task.done ? 'done' : ''}`}>{task.name}</div>
              <div className="task-event-link">{task.event}</div>
            </div>
          </div>
        ))}
        <div className="add-link" onClick={() => setModal('newTask')}>
          <Plus size={13} /> Add Task
        </div>
      </div>

      {/* TODAY'S MEETINGS */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            Today's Meetings
            <span className="badge badge-teal">{meetings.length}</span>
          </div>
          <span className="see-all" onClick={() => setActivePage('calendar')}>See All</span>
        </div>
        {todayMeetings.map(m => (
          <div key={m.id} className="meeting-item">
            <MeetingIcon type={m.type} />
            <div className="meeting-body">
              <div className="title">{m.title}</div>
              <div className="time">{m.time}</div>
              <div className="client">{m.client}</div>
            </div>
          </div>
        ))}
        <div className="add-link" onClick={() => setModal('newMeeting')}>
          <Plus size={13} /> Schedule Meeting
        </div>
      </div>

      {/* PROJECTS WORKED */}
      <div className="card row-span-2">
        <div className="card-header">
          <div className="card-title">Projects Worked</div>
          <span className="see-all" onClick={() => setActivePage('events')}>See All</span>
        </div>
        <DonutChart events={events} />
        <div className="legend">
          {events.map(ev => (
            <div key={ev.id} className="legend-item">
              <div className="legend-dot" style={{ background: ev.color }} />
              <span className="truncate">{ev.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* UPCOMING EVENTS */}
      <div className="card col-span-2">
        <div className="card-header">
          <div className="card-title">Upcoming Events</div>
          <span className="see-all" onClick={() => setActivePage('events')}>See All</span>
        </div>
        <div className="h-scroll">
          {events.map(ev => (
            <div key={ev.id} className="event-strip-card" style={{ background: ev.bg }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div className="event-avatars">
                  {ev.initials.map((l, i) => (
                    <div key={i} className="event-avatar" style={{ background: ev.color }}>{l}</div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="days-badge">{ev.daysLeft} days left</span>
                  <button
                    className="event-remove-btn"
                    title="Remove event"
                    onClick={e => {
                      e.stopPropagation();
                      if (confirm(`Remove "${ev.name}" from events? Other sections will stay saved.`)) cancelEvent(ev.id);
                    }}
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>
              <div className="event-strip-name">{ev.name}</div>
              <ProgressBar value={ev.progress} color={ev.color} color2={ev.color2} />
            </div>
          ))}
        </div>
      </div>

      {/* ALERTS */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">Alerts</div>
          <span className="see-all">See All</span>
        </div>
        {alerts.map(a => (
          <div key={a.id} className="alert-item">
            <span className="alert-icon">{a.type === 'success' ? '✅' : '🔴'}</span>
            <span>
              {a.message}{' '}
              <span className="alert-link">{a.link}</span>
              {a.extra && ` ${a.extra}`}
            </span>
          </div>
        ))}
      </div>

      {/* RECENT TEMPLATES */}
      <div className="card col-span-3">
        <div className="card-header">
          <div className="card-title">Recent Templates</div>
          <span className="see-all" onClick={() => setActivePage('templates')}>See All</span>
        </div>
        <div className="h-scroll">
          {templates.slice(0, 5).map(t => (
            <div key={t.id} className="template-card">
              <div className="template-arrow"><ArrowUpRight size={14} /></div>
              <div className="template-tag">{t.tag}</div>
              <div className="template-name">{t.name}</div>
              <div className="template-desc">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
