import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export default function Calendar() {
  const { events, meetings, setModal } = useApp();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);

  const changeMonth = (dir) => {
    let m = month + dir, y = year;
    if (m > 11) { m = 0; y++; }
    if (m < 0) { m = 11; y--; }
    setMonth(m); setYear(y);
  };

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();

  const getEventsForDay = (d) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return events.filter(ev => ev.date === dateStr);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push({ day: prevDays - firstDay + 1 + i, current: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true });
  }
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    cells.push({ day: i, current: false });
  }

  const selectedEvents = selectedDay ? getEventsForDay(selectedDay) : [];
  const selectedMeetings = selectedDay ? meetings.slice(0, 2) : [];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Calendar</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className="btn-primary" onClick={() => setModal('newMeeting')}>
            <Plus size={14} /> Schedule Meeting
          </button>
        </div>
      </div>

      <div className="calendar-layout">
        {/* Calendar Grid */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {/* Month header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--border-soft)' }}>
            <button onClick={() => changeMonth(-1)} style={{ background: 'none', border: '1px solid var(--border-soft)', borderRadius: 8, padding: '5px 10px', cursor: 'pointer', display: 'flex' }}>
              <ChevronLeft size={16} />
            </button>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 18, color: 'var(--text)' }}>
              {MONTHS[month]} {year}
            </h2>
            <button onClick={() => changeMonth(1)} style={{ background: 'none', border: '1px solid var(--border-soft)', borderRadius: 8, padding: '5px 10px', cursor: 'pointer', display: 'flex' }}>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Day headers */}
          <div className="cal-grid" style={{ padding: '8px 12px 0' }}>
            {DAYS.map(d => (
              <div key={d} className="cal-day-header">{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="cal-grid" style={{ padding: '4px 12px 16px' }}>
            {cells.map((cell, i) => {
              const evs = cell.current ? getEventsForDay(cell.day) : [];
              const isToday = cell.current && cell.day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isSelected = cell.current && selectedDay === cell.day;
              return (
                <div
                  key={i}
                  className={`cal-day ${isToday ? 'today' : ''} ${!cell.current ? 'other-month' : ''}`}
                  style={isSelected && !isToday ? { background: 'var(--purple-pale)', borderColor: 'var(--purple-light)' } : {}}
                  onClick={() => cell.current && setSelectedDay(cell.day === selectedDay ? null : cell.day)}
                >
                  <div className="cal-day-num">{cell.day}</div>
                  {evs.map(ev => (
                    <div key={ev.id} className="cal-event-pill" style={{ background: ev.color }}>{ev.name}</div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Side panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Selected day detail */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                {selectedDay ? `${MONTHS[month]} ${selectedDay}` : 'Select a Day'}
              </div>
            </div>
            {selectedDay ? (
              <>
                {selectedEvents.length > 0 ? (
                  selectedEvents.map(ev => (
                    <div key={ev.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border-soft)' }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: ev.color, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600 }}>{ev.name}</div>
                        <div style={{ fontSize: 10, color: 'var(--text-sec)' }}>{ev.venue}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: 12, color: 'var(--text-sec)', textAlign: 'center', padding: '12px 0' }}>
                    No events on this day
                  </div>
                )}
                {selectedMeetings.map(m => (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border-soft)' }}>
                    <div style={{ fontSize: 16 }}>📅</div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 500 }}>{m.title}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-sec)' }}>{m.time}</div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div style={{ fontSize: 12, color: 'var(--text-sec)', textAlign: 'center', padding: '16px 0' }}>
                Click a date to see details
              </div>
            )}
          </div>

          {/* Upcoming events legend */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Upcoming Events</div>
            </div>
            {events.map(ev => (
              <div key={ev.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: '1px solid var(--border-soft)', fontSize: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: ev.color, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-sec)' }}>{ev.date}</div>
                </div>
                <span style={{ fontSize: 10, color: 'var(--text-sec)', flexShrink: 0 }}>{ev.daysLeft}d</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
