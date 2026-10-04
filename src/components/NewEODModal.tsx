import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const NewEODModal: React.FC<Props> = ({ onClose }) => {
  const { tasks, currentUser, submitEODReport } = useApp();
  
  // Available tasks accepted by current user
  const myAcceptedTasks = tasks.filter(t => t.assigneeId === currentUser.id && t.status !== 'DECLINED');
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [additional, setAdditional] = useState('');
  const [hours, setHours] = useState<number>(8);
  const [blockers, setBlockers] = useState('');

  const handleToggleTask = (taskId: string) => {
    if (selectedTaskIds.includes(taskId)) {
      setSelectedTaskIds(selectedTaskIds.filter(id => id !== taskId));
    } else {
      setSelectedTaskIds([...selectedTaskIds, taskId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!additional && selectedTaskIds.length === 0) return;

    const completedTitles = myAcceptedTasks
      .filter(t => selectedTaskIds.includes(t.id))
      .map(t => t.title);

    submitEODReport(selectedTaskIds, completedTitles, additional, hours, blockers);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel" style={{ width: '100%', maxWidth: '560px', padding: '24px', background: '#0f172a', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={22} color="#10b981" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
              Submit End-of-Day (EOD) Daily Log
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Select Completed Assigned Tasks */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
              Select Assigned Tasks Completed Today
            </label>
            {myAcceptedTasks.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '160px', overflowY: 'auto' }}>
                {myAcceptedTasks.map(task => {
                  const isChecked = selectedTaskIds.includes(task.id);
                  return (
                    <div
                      key={task.id}
                      onClick={() => handleToggleTask(task.id)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: isChecked ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        border: isChecked ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.85rem',
                      }}
                    >
                      <span style={{ color: isChecked ? '#34d399' : '#e2e8f0', fontWeight: isChecked ? 700 : 500 }}>
                        {task.title}
                      </span>
                      {isChecked && <CheckCircle2 size={16} color="#10b981" />}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>
                No active assigned tasks. You can still summarize your accomplishments below.
              </div>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
              Summary of Work & Key Accomplishments Today
            </label>
            <textarea
              className="glass-input"
              rows={3}
              placeholder="Detail your achievements, code commits, GIS processing completed, or team syncs..."
              value={additional}
              onChange={e => setAdditional(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                Total Hours Worked Today
              </label>
              <input
                type="number"
                step="0.5"
                className="glass-input"
                value={hours}
                onChange={e => setHours(parseFloat(e.target.value))}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                Issues / Blockers (Optional)
              </label>
              <input
                type="text"
                className="glass-input"
                placeholder="Any server downtime or data delays?"
                value={blockers}
                onChange={e => setBlockers(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-success">
              Publish EOD History Log
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
