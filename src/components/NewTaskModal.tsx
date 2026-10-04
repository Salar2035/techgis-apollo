import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckSquare } from 'lucide-react';
import type { TaskPriority } from '../types';

interface Props {
  onClose: () => void;
}

export const NewTaskModal: React.FC<Props> = ({ onClose }) => {
  const { users, createTask } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState(users[0]?.id || '');
  const [priority, setPriority] = useState<TaskPriority>('HIGH');
  const [estimatedHours, setEstimatedHours] = useState<number>(4);
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignee = users.find(u => u.id === assigneeId);
    if (!assignee || !title || !description) return;

    createTask({
      title,
      description,
      assigneeId: assignee.id,
      assigneeName: assignee.name,
      assigneeEmail: assignee.email,
      department: assignee.department,
      priority,
      estimatedHours,
      dueDate,
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '24px', background: '#0f172a', border: '1px solid rgba(6, 182, 212, 0.4)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckSquare size={22} color="#06b6d4" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
              Assign Daily Task to Team Member
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
              Task Title
            </label>
            <input
              type="text"
              className="glass-input"
              placeholder="e.g. Faisal Town Volumetric Elevation Raster Processing"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                Assignee
              </label>
              <select
                className="glass-input"
                value={assigneeId}
                onChange={e => setAssigneeId(e.target.value)}
                style={{ background: '#1e293b' }}
              >
                {users.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.designation})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                Priority Level
              </label>
              <select
                className="glass-input"
                value={priority}
                onChange={e => setPriority(e.target.value as TaskPriority)}
                style={{ background: '#1e293b' }}
              >
                <option value="URGENT">URGENT</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="ROUTINE">ROUTINE</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
              Detailed Description & Guidelines
            </label>
            <textarea
              className="glass-input"
              rows={4}
              placeholder="Provide comprehensive details, datasets, deliverables, ground rules, and reference files..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                Est. Hours
              </label>
              <input
                type="number"
                step="0.5"
                className="glass-input"
                value={estimatedHours}
                onChange={e => setEstimatedHours(parseFloat(e.target.value))}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                Due Date
              </label>
              <input
                type="date"
                className="glass-input"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Assign Task
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
