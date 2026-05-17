import { useApp } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend } from 'recharts';

const monthlyRevenue = [
  { month: 'Jan', revenue: 820000 },
  { month: 'Feb', revenue: 1240000 },
  { month: 'Mar', revenue: 980000 },
  { month: 'Apr', revenue: 1560000 },
  { month: 'May', revenue: 1820000 },
  { month: 'Jun', revenue: 2480000 },
];

const taskData = [
  { name: 'Completed', value: 3 },
  { name: 'In Progress', value: 6 },
  { name: 'Pending', value: 3 },
];
const taskColors = ['#00b894', '#6C5CE7', '#fdcb6e'];
const formatBDT = value => `BDT ${(value / 100000).toFixed(value >= 1000000 ? 1 : 0)}L`;

export default function Reports() {
  const { events, tasks, payments } = useApp();

  const totalRevenue = payments.filter(p => p.status === 'paid').reduce((a, p) => a + p.amount, 0);
  const done = tasks.filter(t => t.done).length;
  const completion = tasks.length ? Math.round(done / tasks.length * 100) : 0;

  const eventBudgetData = events.map(ev => ({
    name: ev.name,
    budget: ev.budget,
    spent: ev.spent,
    remaining: Math.max(ev.budget - ev.spent, 0),
  }));
  const avgProgress = events.length ? Math.round(events.reduce((a, e) => a + e.progress, 0) / events.length) : 0;

  const exportPdf = () => {
    const rows = events.map(ev => `
      <tr>
        <td>${ev.name}</td>
        <td>${ev.type}</td>
        <td>${ev.date}</td>
        <td>${ev.venue}</td>
        <td>BDT ${ev.budget.toLocaleString()}</td>
        <td>${ev.progress}%</td>
      </tr>
    `).join('');
    const reportWindow = window.open('', '_blank', 'width=900,height=700');
    if (!reportWindow) {
      alert('Please allow popups to export the PDF.');
      return;
    }
    reportWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>MeetCraft Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 28px; color: #1e1b4b; }
            h1 { margin: 0 0 8px; }
            .muted { color: #6b7280; margin-bottom: 22px; }
            .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
            .stat { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; }
            .label { color: #6b7280; font-size: 12px; margin-bottom: 6px; }
            .value { font-size: 20px; font-weight: 700; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; }
            th, td { border-bottom: 1px solid #e5e7eb; padding: 9px; text-align: left; }
            th { background: #f5f4fc; }
          </style>
        </head>
        <body>
          <h1>MeetCraft Event Report</h1>
          <div class="muted">Generated ${new Date().toLocaleString()}</div>
          <div class="stats">
            <div class="stat"><div class="label">Total Revenue</div><div class="value">BDT ${totalRevenue.toLocaleString()}</div></div>
            <div class="stat"><div class="label">Active Events</div><div class="value">${events.length}</div></div>
            <div class="stat"><div class="label">Task Completion</div><div class="value">${completion}%</div></div>
            <div class="stat"><div class="label">Avg Progress</div><div class="value">${avgProgress}%</div></div>
          </div>
          <table>
            <thead><tr><th>Event</th><th>Type</th><th>Date</th><th>Venue</th><th>Budget</th><th>Progress</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
          <script>window.onload = () => { window.print(); };</script>
        </body>
      </html>
    `);
    reportWindow.document.close();
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Reports</h1>
        <button className="btn-primary" onClick={exportPdf}>Export PDF</button>
      </div>

      {/* Summary stats */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card">
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value" style={{ color: 'var(--teal)' }}>BDT {totalRevenue.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Events</div>
          <div className="stat-value" style={{ color: 'var(--purple)' }}>{events.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Task Completion</div>
          <div className="stat-value" style={{ color: 'var(--teal)' }}>{completion}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Event Progress</div>
          <div className="stat-value" style={{ color: 'var(--orange)' }}>
            {avgProgress}%
          </div>
        </div>
      </div>

      <div className="reports-grid">
        {/* Monthly Revenue */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Monthly Revenue</div>
            <span className="badge badge-soft-teal">2025</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyRevenue} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-soft)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-sec)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-sec)' }} axisLine={false} tickLine={false} tickFormatter={formatBDT} />
              <Tooltip
                formatter={v => [`BDT ${v.toLocaleString()}`, 'Revenue']}
                contentStyle={{ borderRadius: 10, border: '1px solid var(--border-soft)', fontSize: 12 }}
              />
              <Bar dataKey="revenue" fill="var(--purple)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Task Distribution Pie */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Task Distribution</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={taskData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {taskData.map((_, i) => <Cell key={i} fill={taskColors[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1 }}>
              {taskData.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: taskColors[i], flexShrink: 0 }} />
                  <span style={{ flex: 1, color: 'var(--text-sec)' }}>{d.name}</span>
                  <span style={{ fontWeight: 600, color: 'var(--text)' }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Event Budget vs Spent */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-header">
          <div className="card-title">Budget vs Spent by Event</div>
        </div>
        <ResponsiveContainer width="100%" height={420}>
          <BarChart data={eventBudgetData} margin={{ top: 14, right: 24, bottom: 92, left: 14 }} barCategoryGap="26%" barGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-soft)" />
            <XAxis
              dataKey="name"
              interval={0}
              angle={-32}
              textAnchor="end"
              height={90}
              tick={{ fontSize: 11, fill: 'var(--text-sec)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 10, fill: 'var(--text-sec)' }} axisLine={false} tickLine={false} tickFormatter={formatBDT} />
            <Tooltip formatter={v => `BDT ${v.toLocaleString()}`} contentStyle={{ borderRadius: 10, border: '1px solid var(--border-soft)', fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="budget" fill="#a29bfe" radius={[4, 4, 0, 0]} name="Budget" maxBarSize={28} />
            <Bar dataKey="spent" fill="#6C5CE7" radius={[4, 4, 0, 0]} name="Spent" maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue trend line */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">Revenue Trend</div>
          <span className="badge badge-soft-purple">Last 6 months</span>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-soft)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-sec)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--text-sec)' }} axisLine={false} tickLine={false} tickFormatter={formatBDT} />
            <Tooltip formatter={v => [`BDT ${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: 10, border: '1px solid var(--border-soft)', fontSize: 12 }} />
            <Line type="monotone" dataKey="revenue" stroke="var(--purple)" strokeWidth={2.5} dot={{ fill: 'var(--purple)', r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
