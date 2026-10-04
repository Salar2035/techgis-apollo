import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Plus, Calendar, Clock, CheckCircle2, Search } from 'lucide-react';
import { NewEODModal } from './NewEODModal';

export const EODReports: React.FC = () => {
  const { eodReports } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = eodReports.filter(rep =>
    rep.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rep.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rep.additionalAccomplishments.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title & Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>
              End-of-Day (EOD) Reports & History Database
            </h2>
            <span className="badge badge-admin" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
              <FileText size={12} /> Team History Log
            </span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>
            Employees submit daily task accomplishment logs at the end of their shift for team visibility and history.
          </p>
        </div>

        <button className="btn-primary" style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }} onClick={() => setShowModal(true)}>
          <Plus size={18} /> Submit End-of-Day Report
        </button>
      </div>

      {/* Search & Stats Bar */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="glass-input"
            style={{ paddingLeft: '40px' }}
            placeholder="Search daily history by employee name, department, or keyword..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="glass-panel" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
            <Calendar size={16} color="#06b6d4" />
            <span>Total Logged Days: <strong style={{ color: '#fff' }}>{eodReports.length}</strong></span>
          </div>
        </div>
      </div>

      {/* Reports Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredReports.map(report => (
          <div
            key={report.id}
            className="glass-panel"
            style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  background: 'rgba(6, 182, 212, 0.15)',
                  color: '#06b6d4',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                }}>
                  {report.date}
                </div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{report.userName}</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{report.userDesignation} • {report.department}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="badge badge-hod">
                  <Clock size={12} /> {report.totalHoursLogged} Hours Logged
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  Submitted {new Date(report.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            {/* Completed Tasks List */}
            {report.completedTaskTitles.length > 0 && (
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Completed Tasks Today
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                  {report.completedTaskTitles.map((tTitle, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#e2e8f0', background: 'rgba(16, 185, 129, 0.06)', padding: '6px 12px', borderRadius: '8px' }}>
                      <CheckCircle2 size={16} color="#10b981" />
                      <span>{tTitle}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Accomplishments */}
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Summary & Key Accomplishments
              </span>
              <p style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: '4px', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                {report.additionalAccomplishments}
              </p>
            </div>

            {/* Blockers if any */}
            {report.blockersEncountered && (
              <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '10px 14px', borderRadius: '8px', fontSize: '0.82rem', color: '#fbbf24' }}>
                <strong>Issues / Blockers Encountered:</strong> {report.blockersEncountered}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
          <FileText size={40} style={{ marginBottom: '12px', opacity: 0.5 }} />
          <h3>No EOD reports logged yet</h3>
          <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
            Submit an End-of-Day report to start your team's historical audit database.
          </p>
        </div>
      )}

      {/* Modal */}
      {showModal && <NewEODModal onClose={() => setShowModal(false)} />}

    </div>
  );
};
