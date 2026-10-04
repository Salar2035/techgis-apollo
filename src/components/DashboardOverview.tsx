import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, CheckSquare, Shield, FileText, ArrowUpRight, Layers } from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { currentUser, users, proposals, tasks, eodReports, workstreams, setActiveTab } = useApp();

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
              Tech-GIS Pvt Ltd Executive Control Center
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginTop: '6px', maxWidth: '720px' }}>
              Comprehensive operational management for Geospatial & LiDAR Survey, Smart City Digital Twins, IoT Mesh Networks, and PostGIS Infrastructure across all active client workstreams.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {myPendingTasksCount > 0 && (
              <button className="btn-primary" onClick={() => setActiveTab('tasks')}>
                <CheckSquare size={18} /> {myPendingTasksCount} Tasks Pending Acceptance
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
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Registered Personnel</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(6, 182, 212, 0.2)', padding: '14px', borderRadius: '12px' }}>
            <Layers size={24} color="#06b6d4" />
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>{workstreams.length}</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Active Client Workstreams</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '14px', borderRadius: '12px' }}>
            <CheckSquare size={24} color="#34d399" />
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>{tasks.length}</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Daily Tasks Logged</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '14px', borderRadius: '12px' }}>
            <FileText size={24} color="#fbbf24" />
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>{eodReports.length}</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>EOD Audit Logs</div>
          </div>
        </div>

      </div>

      {/* Main Grid: Workstreams & Tasks */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        
        {/* Tech-GIS Client Workstreams Portfolio */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
                Tech-GIS Active Workstreams & Client Projects
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Real-time progress tracking for NDMA, DHA Islamabad, K-Electric, Faisal Town & Capital Smart City.
              </p>
            </div>
            <span className="badge badge-admin">5 Active Contracts</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {workstreams.map(ws => (
              <div
                key={ws.id}
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#06b6d4', fontWeight: 700 }}>
                      {ws.client}
                    </span>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
                      {ws.title}
                    </h4>
                  </div>
                  <span className={`badge ${ws.status === 'Demo Ready' ? 'badge-admin' : ws.status === 'In Progress' ? 'badge-hod' : 'badge-high'}`}>
                    {ws.status}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '0.78rem', color: '#94a3b8' }}>
                  <span>Category: <strong style={{ color: '#e2e8f0' }}>{ws.category}</strong></span>
                  <span>Target Due: <strong style={{ color: '#f59e0b' }}>{ws.targetDeadline}</strong></span>
                </div>

                {/* Progress bar */}
                <div style={{ marginTop: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>
                    <span>Completion</span>
                    <span style={{ color: '#34d399', fontWeight: 700 }}>{ws.progressPercent}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${ws.progressPercent}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #06b6d4, #10b981)',
                        borderRadius: '3px',
                      }}
                    />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* System Quick Controls & Daily Tasks Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
              Quick Operational Actions
            </h3>

            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setActiveTab('tasks')}>
              <CheckSquare size={16} /> Assign or Accept Daily Tasks
            </button>

            <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setActiveTab('eod')}>
              <FileText size={16} /> Submit End-of-Day EOD Log
            </button>

            {currentUser.isAdmin && (
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', borderColor: '#a78bfa', color: '#a78bfa' }} onClick={() => setActiveTab('designations')}>
                <Shield size={16} /> Propose Designation Change
              </button>
            )}

            <div style={{ marginTop: 'auto', background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.2)', padding: '12px', borderRadius: '10px', fontSize: '0.78rem', color: '#cbd5e1' }}>
              <strong>Logged Account:</strong> {currentUser.email}<br />
              <strong>Designation:</strong> {currentUser.designation}<br />
              <strong>Clearance:</strong> {currentUser.isAdmin ? 'System Admin' : currentUser.role}
            </div>
          </div>

          {/* Daily Task List Feed */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                Recent Operational Tasks
              </h3>
              <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '3px 8px' }} onClick={() => setActiveTab('tasks')}>
                View All <ArrowUpRight size={12} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {tasks.slice(0, 3).map(t => (
                <div key={t.id} style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.82rem' }}>
                  <div style={{ fontWeight: 700, color: '#fff' }}>{t.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '2px' }}>
                    For: {t.assigneeName} • Priority: <span style={{ color: '#06b6d4' }}>{t.priority}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
