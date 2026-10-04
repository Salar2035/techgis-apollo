import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, CheckSquare, Shield, FileText, ArrowUpRight } from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { currentUser, users, proposals, tasks, eodReports, setActiveTab } = useApp();

  const pendingProposalsCount = proposals.filter(p => p.status === 'PENDING_APPROVAL').length;
  const myPendingTasksCount = tasks.filter(t => t.assigneeId === currentUser.id && t.status === 'PENDING_ACCEPTANCE').length;

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Welcome Banner */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '28px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12), rgba(139, 92, 246, 0.12))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="badge badge-admin" style={{ marginBottom: '8px' }}>
              Welcome back, {currentUser.name}
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>
              TechGIS Apollo Executive Control Center
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginTop: '6px', maxWidth: '680px' }}>
              Manage company designations, monitor multi-admin approvals, assign daily tasks, and track real-time end-of-day reports across all departments.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {myPendingTasksCount > 0 && (
              <button className="btn-primary" onClick={() => setActiveTab('tasks')}>
                <CheckSquare size={18} /> {myPendingTasksCount} Pending Tasks To Accept
              </button>
            )}
            {currentUser.isAdmin && pendingProposalsCount > 0 && (
              <button className="btn-secondary" style={{ border: '1px solid #a78bfa', color: '#a78bfa' }} onClick={() => setActiveTab('designations')}>
                <Shield size={18} /> {pendingProposalsCount} Admin Proposals
              </button>
            )}
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.2)', padding: '14px', borderRadius: '12px' }}>
            <Users size={24} color="#a78bfa" />
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>{users.length}</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Active Personnel</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(6, 182, 212, 0.2)', padding: '14px', borderRadius: '12px' }}>
            <CheckSquare size={24} color="#06b6d4" />
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>{tasks.length}</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Total Daily Tasks</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '14px', borderRadius: '12px' }}>
            <FileText size={24} color="#34d399" />
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>{eodReports.length}</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>EOD History Logs</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '14px', borderRadius: '12px' }}>
            <Shield size={24} color="#fbbf24" />
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>{pendingProposalsCount}</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Pending Admin Approvals</div>
          </div>
        </div>

      </div>

      {/* Quick Action Panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        
        {/* Recent Tasks */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
              Recent Active Daily Tasks
            </h3>
            <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '4px 10px' }} onClick={() => setActiveTab('tasks')}>
              View All Tasks <ArrowUpRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {tasks.slice(0, 4).map(task => (
              <div
                key={task.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{task.title}</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Assigned to: {task.assigneeName} • Due {task.dueDate}</div>
                </div>
                <span className="badge badge-hod" style={{ fontSize: '0.65rem' }}>
                  {task.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Company Quick Links & Admin Status */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
            System Quick Actions
          </h3>

          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setActiveTab('tasks')}>
            <CheckSquare size={16} /> Assign or Accept Daily Tasks
          </button>

          <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setActiveTab('eod')}>
            <FileText size={16} /> Submit EOD Daily Report
          </button>

          {currentUser.isAdmin && (
            <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', borderColor: '#a78bfa', color: '#a78bfa' }} onClick={() => setActiveTab('designations')}>
              <Shield size={16} /> Designation & Admin Approvals
            </button>
          )}

          <div style={{ marginTop: 'auto', background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.2)', padding: '12px', borderRadius: '10px', fontSize: '0.78rem', color: '#cbd5e1' }}>
            <strong>Logged Account:</strong> {currentUser.email}<br />
            <strong>Designation:</strong> {currentUser.designation}
          </div>
        </div>

      </div>

    </div>
  );
};
