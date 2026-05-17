import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Trash2, Search } from 'lucide-react';

const PRIORITY_BADGE = { high: 'badge-soft-red', medium: 'badge-soft-yellow', low: 'badge-soft-teal' };

export default function Tasks() {
  const { tasks, toggleTask, deleteTask, setModal } = useApp();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = tasks.filter(t => {
    if (filter === 'pending') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  }).filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.event.toLowerCase().includes(search.toLowerCase()));

  const done = tasks.filter(t => t.done).length;
  const handleDeleteTask = (task) => {
    if (confirm(`Delete task "${task.name}"?`)) {
      deleteTask(task.id);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Tasks</h1>
        <button className="btn-primary" onClick={() => setModal('newTask')}>
          <Plus size={14} /> Add Task
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 18 }}>
        <div className="stat-card">
          <div className="stat-label">Total Tasks</div>
          <div className="stat-value">{tasks.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Completed</div>
          <div className="stat-value" style={{ color: 'var(--teal)' }}>{done}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending</div>
          <div className="stat-value" style={{ color: 'var(--orange)' }}>{tasks.length - done}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Completion</div>
          <div className="stat-value" style={{ color: 'var(--purple)' }}>
            {tasks.length ? Math.round(done / tasks.length * 100) : 0}%
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="search-bar" style={{ background: 'white', flex: 1, minWidth: 200 }}>
          <Search size={14} color="var(--text-light)" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks..." />
        </div>
        {['all', 'pending', 'done'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '6px 14px', borderRadius: 20, border: '1px solid var(--border)',
            background: filter === f ? 'var(--purple)' : 'white',
            color: filter === f ? 'white' : 'var(--text-sec)',
            cursor: 'pointer', fontSize: 12, fontWeight: filter === f ? 600 : 400,
            fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s', textTransform: 'capitalize'
          }}>{f}</button>
        ))}
      </div>

      {/* Task List */}
      <div className="card">
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-sec)' }}>No tasks found.</div>
        )}
        {filtered.map(task => (
          <div key={task.id} className="task-item">
            <div
              className={`task-check ${task.done ? 'done' : ''}`}
              onClick={() => toggleTask(task.id)}
              title="Toggle complete"
            />
            <div className="task-body" style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <span className={`task-name ${task.done ? 'done' : ''}`}>{task.name}</span>
                <span className={`badge ${PRIORITY_BADGE[task.priority]}`}>{task.priority}</span>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span className="task-event-link">{task.event}</span>
                {task.due && <span style={{ fontSize: 10, color: 'var(--text-light)' }}>Due: {task.due}</span>}
              </div>
            </div>
            <button
              onClick={() => handleDeleteTask(task)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', padding: 4, display: 'flex' }}
              title="Delete task"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
