import React from 'react';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, Users, CheckSquare, FileText, Cpu, ShieldCheck } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, proposals, currentUser, tasks } = useApp();

  const pendingProposals = proposals.filter(p => p.status === 'PENDING_APPROVAL' && !p.approvedByAdminIds.includes(currentUser.id)).length;
  const myPendingTasks = tasks.filter(t => t.assigneeId === currentUser.id && t.status === 'PENDING_ACCEPTANCE').length;

  const navItems = [
    { id: 'dashboard', label: 'Overview & Systems', icon: LayoutDashboard },
    {
      id: 'designations',
      label: 'Designations & Admins',
      icon: Users,
      badge: pendingProposals > 0 && currentUser.isAdmin ? pendingProposals : null,
      badgeColor: '#8b5cf6',
    },
    {
      id: 'tasks',
      label: 'Daily Task Management',
      icon: CheckSquare,
      badge: myPendingTasks > 0 ? myPendingTasks : null,
      badgeColor: '#06b6d4',
    },
    { id: 'eod', label: 'EOD Reports & History', icon: FileText },
    { id: 'systems', label: 'System Usage Health', icon: Cpu },
  ];

  return (
    <aside style={{ width: '260px', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px', minHeight: 'calc(100vh - 70px)' }}>
      <div style={{ padding: '0 12px 12px', color: '#475569', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Main Navigation
      </div>

      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '12px 16px',
              borderRadius: '12px',
              border: isActive ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid transparent',
              background: isActive ? 'linear-gradient(90deg, rgba(6, 182, 212, 0.15), rgba(59, 130, 246, 0.05))' : 'transparent',
              color: isActive ? '#38bdf8' : '#94a3b8',
              fontWeight: isActive ? 700 : 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Icon size={20} color={isActive ? '#06b6d4' : '#64748b'} />
              <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
            </div>

            {item.badge !== null && item.badge !== undefined && (
              <span style={{
                background: item.badgeColor,
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 800,
                borderRadius: '12px',
                padding: '2px 8px',
              }}>
                {item.badge}
              </span>
            )}
          </button>
        );
      })}

      {/* Admin Status Card */}
      <div className="glass-panel" style={{ marginTop: 'auto', padding: '16px', background: 'rgba(15, 23, 42, 0.5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <ShieldCheck size={20} color={currentUser.isAdmin ? '#a78bfa' : '#64748b'} />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e2e8f0' }}>
            {currentUser.isAdmin ? 'Admin Clearance' : 'Standard Access'}
          </span>
        </div>
        <p style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4 }}>
          {currentUser.isAdmin
            ? 'Full administrative rights. You can propose designation changes and approve admin requests.'
            : 'Department access. You can accept tasks assigned to you and log daily EOD reports.'}
        </p>
      </div>
    </aside>
  );
};
