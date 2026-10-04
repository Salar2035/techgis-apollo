import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Shield } from 'lucide-react';

interface Props {
  preselectedUserId: string | null;
  onClose: () => void;
}

export const DesignationModal: React.FC<Props> = ({ preselectedUserId, onClose }) => {
  const { users, createDesignationProposal } = useApp();
  const [targetUserId, setTargetUserId] = useState<string>(preselectedUserId || users[0]?.id || '');
  const [proposedDesignation, setProposedDesignation] = useState('');
  const [reason, setReason] = useState('');

  const selectedUser = users.find(u => u.id === targetUserId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUserId || !proposedDesignation || !reason) return;
    createDesignationProposal(targetUserId, proposedDesignation, reason);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '24px', background: '#0f172a', border: '1px solid rgba(139, 92, 246, 0.4)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={22} color="#a78bfa" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
              Propose Designation Change
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
              Select Individual
            </label>
            <select
              className="glass-input"
              value={targetUserId}
              onChange={e => setTargetUserId(e.target.value)}
              style={{ background: '#1e293b' }}
            >
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.designation})
                </option>
              ))}
            </select>
          </div>

          {selectedUser && (
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 14px', borderRadius: '10px', fontSize: '0.85rem' }}>
              <span style={{ color: '#94a3b8' }}>Current Designation: </span>
              <strong style={{ color: '#06b6d4' }}>{selectedUser.designation}</strong>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
              Proposed New Designation
            </label>
            <input
              type="text"
              className="glass-input"
              placeholder="e.g. Principal Geospatial Architect"
              value={proposedDesignation}
              onChange={e => setProposedDesignation(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
              Reason / Justification
            </label>
            <textarea
              className="glass-input"
              rows={3}
              placeholder="Detail reasons for performance, promotion, or departmental restructuring..."
              value={reason}
              onChange={e => setReason(e.target.value)}
              required
            />
          </div>

          <div style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '10px', borderRadius: '8px', fontSize: '0.75rem', color: '#cbd5e1' }}>
            <strong>Governance Note:</strong> Creating this proposal will send it to all active Admins. The user's designation will officially update once required admin approvals are registered.
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}>
              Submit for Admin Approval
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
