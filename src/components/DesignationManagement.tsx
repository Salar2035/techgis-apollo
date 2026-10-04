import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Clock, CheckCircle2, XCircle, Plus } from 'lucide-react';
import { DesignationModal } from './DesignationModal';

export const DesignationManagement: React.FC = () => {
  const { users, proposals, currentUser, approveDesignationProposal, rejectDesignationProposal } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [preselectedUserId, setPreselectedUserId] = useState<string | null>(null);

  const pendingProposals = proposals.filter(p => p.status === 'PENDING_APPROVAL');
  const pastProposals = proposals.filter(p => p.status !== 'PENDING_APPROVAL');

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title & Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>
              Company Designation & Admin Authority
            </h2>
            <span className="badge badge-admin">
              <Shield size={12} /> Admin Governance
            </span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>
            Designation updates require multi-admin approval to ensure cross-departmental alignment and security.
          </p>
        </div>

        {currentUser.isAdmin ? (
          <button className="btn-primary" onClick={() => { setPreselectedUserId(null); setShowModal(true); }}>
            <Plus size={18} /> Propose Designation Change
          </button>
        ) : (
          <div style={{ fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic' }}>
            Logged in as non-admin. Log in as Salar or Aisha to propose changes.
          </div>
        )}
      </div>

      {/* Pending Approvals Section */}
      {pendingProposals.length > 0 && (
        <div className="glass-panel glass-panel-glow" style={{ padding: '20px', background: 'rgba(139, 92, 246, 0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Clock size={20} color="#a78bfa" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0' }}>
              Pending Admin Designation Proposals ({pendingProposals.length})
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px' }}>
            {pendingProposals.map(prop => {
              const hasApproved = prop.approvedByAdminIds.includes(currentUser.id);
              return (
                <div
                  key={prop.id}
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '14px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '12px',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8' }}>{prop.targetUserName}</span>
                      <span className="badge badge-high" style={{ fontSize: '0.65rem' }}>
                        {prop.approvedByAdminIds.length} / {prop.requiredApprovals} Admin Approvals
                      </span>
                    </div>

                    <div style={{ margin: '10px 0', fontSize: '0.9rem' }}>
                      <span style={{ color: '#94a3b8', textDecoration: 'line-through' }}>{prop.currentDesignation}</span>
                      <span style={{ margin: '0 8px', color: '#a78bfa', fontWeight: 700 }}>→</span>
                      <span style={{ color: '#10b981', fontWeight: 700 }}>{prop.proposedDesignation}</span>
                    </div>

                    <p style={{ fontSize: '0.8rem', color: '#cbd5e1', background: 'rgba(255, 255, 255, 0.03)', padding: '8px 12px', borderRadius: '8px' }}>
                      <strong>Reason:</strong> {prop.reason}
                    </p>

                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '8px' }}>
                      Proposed by: <strong style={{ color: '#e2e8f0' }}>{prop.proposedByAdminName}</strong>
                    </div>
                  </div>

                  {currentUser.isAdmin && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px' }}>
                      {hasApproved ? (
                        <div style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                          <CheckCircle2 size={16} /> You approved this proposal
                        </div>
                      ) : (
                        <>
                          <button className="btn-success" style={{ flex: 1 }} onClick={() => approveDesignationProposal(prop.id)}>
                            <CheckCircle2 size={16} /> Approve Change
                          </button>
                          <button className="btn-danger" onClick={() => rejectDesignationProposal(prop.id)}>
                            <XCircle size={16} /> Reject
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Employee Roster */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Company Personnel & Designations
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {users.map(u => (
            <div
              key={u.id}
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={u.avatar} alt={u.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{u.name}</span>
                    {u.isAdmin ? (
                      <span className="badge badge-admin">Admin</span>
                    ) : u.role === 'HOD' ? (
                      <span className="badge badge-hod">HOD</span>
                    ) : (
                      <span className="badge badge-member">Member</span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#06b6d4', fontWeight: 600, marginTop: '2px' }}>
                    {u.designation}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{u.department} • {u.email}</div>
                </div>
              </div>

              {currentUser.isAdmin && (
                <button
                  className="btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                  onClick={() => {
                    setPreselectedUserId(u.id);
                    setShowModal(true);
                  }}
                >
                  Change
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Designation History */}
      {pastProposals.length > 0 && (
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '14px' }}>
            Designation Change Audit Trail
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {pastProposals.map(prop => (
              <div
                key={prop.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  fontSize: '0.85rem',
                }}
              >
                <div>
                  <strong style={{ color: '#fff' }}>{prop.targetUserName}</strong> designation changed to{' '}
                  <span style={{ color: '#10b981', fontWeight: 700 }}>{prop.proposedDesignation}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Approved by All Admins</span>
                  <span className={`badge ${prop.status === 'APPROVED' ? 'badge-hod' : 'badge-urgent'}`}>
                    {prop.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Dialog */}
      {showModal && (
        <DesignationModal
          preselectedUserId={preselectedUserId}
          onClose={() => setShowModal(false)}
        />
      )}

    </div>
  );
};
