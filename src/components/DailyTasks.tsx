import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckSquare, Plus, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { NewTaskModal } from './NewTaskModal';
import type { TaskPriority, TaskStatus } from '../types';

export const DailyTasks: React.FC = () => {
  const { tasks, currentUser, acceptTask, declineTask, completeTask } = useApp();
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [tabFilter, setTabFilter] = useState<'my_tasks' | 'assigned_by_me' | 'all'>('my_tasks');
  const [declineReasonInput, setDeclineReasonInput] = useState<{ [key: string]: string }>({});
  const [showDeclineForm, setShowDeclineForm] = useState<{ [key: string]: boolean }>({});

  const isManagerOrAdmin = currentUser.isAdmin || currentUser.role === 'HOD';

  const filteredTasks = tasks.filter(t => {
    if (tabFilter === 'my_tasks') return t.assigneeId === currentUser.id;
    if (tabFilter === 'assigned_by_me') return t.assignedById === currentUser.id;
    return true;
  });

  const getPriorityBadgeClass = (priority: TaskPriority) => {
    switch (priority) {
      case 'URGENT': return 'badge-urgent';
      case 'HIGH': return 'badge-high';
      case 'MEDIUM': return 'badge-medium';
      default: return 'badge-routine';
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'PENDING_ACCEPTANCE':
        return <span className="badge badge-high" style={{ border: '1px solid #f59e0b' }}><Clock size={12} /> Pending Acceptance</span>;
      case 'IN_PROGRESS':
        return <span className="badge badge-hod"><Clock size={12} /> In Progress</span>;
      case 'COMPLETED':
        return <span className="badge badge-admin" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}><CheckCircle2 size={12} /> Completed</span>;
      case 'DECLINED':
        return <span className="badge badge-urgent"><XCircle size={12} /> Declined</span>;
    }
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>
              Daily Tasks & Assignment Workflow
            </h2>
            <span className="badge badge-hod">
              <CheckSquare size={12} /> Task System
            </span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>
            Tasks assigned by Department Heads & Management require formal acceptance by the assigned individual.
          </p>
        </div>

        {isManagerOrAdmin && (
          <button className="btn-primary" onClick={() => setShowNewTaskModal(true)}>
            <Plus size={18} /> Assign New Task
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
        <button
          className={tabFilter === 'my_tasks' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.85rem' }}
          onClick={() => setTabFilter('my_tasks')}
        >
          My Assigned Tasks ({tasks.filter(t => t.assigneeId === currentUser.id).length})
        </button>
        
        {isManagerOrAdmin && (
          <button
            className={tabFilter === 'assigned_by_me' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.85rem' }}
            onClick={() => setTabFilter('assigned_by_me')}
          >
            Tasks I Assigned ({tasks.filter(t => t.assignedById === currentUser.id).length})
          </button>
        )}

        <button
          className={tabFilter === 'all' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.85rem' }}
          onClick={() => setTabFilter('all')}
        >
          Company Task Directory ({tasks.length})
        </button>
      </div>

      {/* Task Cards List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
        {filteredTasks.map(task => {
          const isAssignee = task.assigneeId === currentUser.id;
          const isPending = task.status === 'PENDING_ACCEPTANCE';
          const isInProgress = task.status === 'IN_PROGRESS';

          return (
            <div
              key={task.id}
              className={`glass-panel ${isPending && isAssignee ? 'glass-panel-glow' : ''}`}
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                background: isPending && isAssignee ? 'rgba(6, 182, 212, 0.08)' : 'rgba(18, 24, 38, 0.75)',
              }}
            >
              <div>
                {/* Header info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>
                    {task.priority}
                  </span>
                  {getStatusBadge(task.status)}
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '8px', lineHeight: 1.3 }}>
                  {task.title}
                </h3>

                {/* Description multiline */}
                <div style={{
                  fontSize: '0.85rem',
                  color: '#cbd5e1',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: '12px',
                  borderRadius: '10px',
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.5,
                  marginBottom: '12px',
                }}>
                  {task.description}
                </div>

                {/* Metadata */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.78rem', color: '#94a3b8' }}>
                  <div>Assigned To: <strong style={{ color: '#06b6d4' }}>{task.assigneeName}</strong></div>
                  <div>Assigned By: <strong style={{ color: '#e2e8f0' }}>{task.assignedByName}</strong></div>
                  <div>Est. Hours: <strong style={{ color: '#e2e8f0' }}>{task.estimatedHours} hrs</strong></div>
                  <div>Due: <strong style={{ color: '#f59e0b' }}>{task.dueDate}</strong></div>
                </div>

                {task.declineReason && (
                  <div style={{ marginTop: '10px', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.2)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem', color: '#fb7185' }}>
                    <strong>Decline Reason:</strong> {task.declineReason}
                  </div>
                )}
              </div>

              {/* Action Buttons for Assignee */}
              {isAssignee && isPending && (
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: 600 }}>
                    ⚠️ Acceptance Required: Please approve from your side to confirm you will do this task.
                  </div>

                  {!showDeclineForm[task.id] ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn-success" style={{ flex: 1 }} onClick={() => acceptTask(task.id)}>
                        <CheckCircle2 size={16} /> Accept & Commit to Task
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => setShowDeclineForm({ ...showDeclineForm, [task.id]: true })}
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <input
                        type="text"
                        className="glass-input"
                        placeholder="State reason for declining task..."
                        value={declineReasonInput[task.id] || ''}
                        onChange={e => setDeclineReasonInput({ ...declineReasonInput, [task.id]: e.target.value })}
                      />
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          className="btn-danger"
                          style={{ flex: 1 }}
                          onClick={() => {
                            if (declineReasonInput[task.id]) {
                              declineTask(task.id, declineReasonInput[task.id]);
                            }
                          }}
                        >
                          Confirm Decline
                        </button>
                        <button className="btn-secondary" onClick={() => setShowDeclineForm({ ...showDeclineForm, [task.id]: false })}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mark Complete for In Progress tasks */}
              {isAssignee && isInProgress && (
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px' }}>
                  <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => completeTask(task.id)}>
                    <CheckCircle2 size={16} /> Mark Completed Today
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredTasks.length === 0 && (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
          <CheckSquare size={40} style={{ marginBottom: '12px', opacity: 0.5 }} />
          <h3>No tasks found in this view</h3>
          <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
            Switch filters or assign a new task to get started.
          </p>
        </div>
      )}

      {/* New Task Modal */}
      {showNewTaskModal && (
        <NewTaskModal onClose={() => setShowNewTaskModal(false)} />
      )}

    </div>
  );
};
