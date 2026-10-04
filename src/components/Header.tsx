import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Bell, ChevronDown, Layers, UserPlus } from 'lucide-react';
import { RegisterModal } from './RegisterModal';

export const Header: React.FC = () => {
  const { currentUser, setCurrentUser, users, proposals, tasks } = useApp();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Pending items badge count
  const pendingProposalsCount = proposals.filter(p => p.status === 'PENDING_APPROVAL' && !p.approvedByAdminIds.includes(currentUser.id)).length;
  const pendingTasksCount = tasks.filter(t => t.assigneeId === currentUser.id && t.status === 'PENDING_ACCEPTANCE').length;
  const totalNotifications = pendingProposalsCount + pendingTasksCount;

  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0, padding: '14px 28px', position: 'sticky', top: 0, zIndex: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand & System Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(6, 182, 212, 0.4)',
          }}>
            <Layers size={24} color="#fff" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(90deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                TechGIS Apollo
              </h1>
              <span className="badge badge-admin" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                v2.4 Enterprise
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Company Management & System Usage Infrastructure
            </p>
          </div>
        </div>

        {/* Action Controls & User Account Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
          {/* Create Account Button */}
          <button
            className="btn-primary"
            style={{ fontSize: '0.85rem', padding: '8px 14px' }}
            onClick={() => setShowRegisterModal(true)}
          >
            <UserPlus size={16} /> Create Account
          </button>

          {/* Notifications Chip */}
          <div style={{ position: 'relative' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
            }}>
              <Bell size={18} color={totalNotifications > 0 ? '#06b6d4' : '#94a3b8'} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Notifications</span>
              {totalNotifications > 0 && (
                <span style={{
                  background: '#f43f5e',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  borderRadius: '12px',
                  padding: '2px 7px',
                }}>
                  {totalNotifications}
                </span>
              )}
            </div>
          </div>

          {/* User Profile & Simulator Dropdown */}
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                padding: '6px 14px 6px 8px',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #06b6d4' }}
              />
              <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{currentUser.name}</span>
                  {currentUser.isAdmin && <Shield size={14} color="#8b5cf6" />}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{currentUser.designation}</div>
              </div>
              <ChevronDown size={16} color="#64748b" />
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div
                className="glass-panel"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '110%',
                  width: '320px',
                  padding: '12px',
                  zIndex: 50,
                  background: '#0f172a',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                <div style={{ padding: '6px 10px 10px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Active Personnel Directory ({users.length})
                  </span>
                </div>

                <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                  {users.map(u => (
                    <div
                      key={u.id}
                      onClick={() => {
                        setCurrentUser(u);
                        setShowDropdown(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: u.id === currentUser.id ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                        border: u.id === currentUser.id ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid transparent',
                        marginBottom: '4px',
                      }}
                    >
                      <img src={u.avatar} alt={u.name} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: u.id === currentUser.id ? '#06b6d4' : '#e2e8f0' }}>
                          {u.name}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{u.designation}</div>
                      </div>
                      {u.isAdmin ? (
                        <span className="badge badge-admin" style={{ fontSize: '0.6rem' }}>Admin</span>
                      ) : u.role === 'HOD' ? (
                        <span className="badge badge-hod" style={{ fontSize: '0.6rem' }}>HOD</span>
                      ) : (
                        <span className="badge badge-member" style={{ fontSize: '0.6rem' }}>Member</span>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  className="btn-secondary"
                  style={{ width: '100%', marginTop: '8px', fontSize: '0.8rem', justifyContent: 'center' }}
                  onClick={() => {
                    setShowDropdown(false);
                    setShowRegisterModal(true);
                  }}
                >
                  <UserPlus size={14} /> Register New Account
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} />
      )}
    </header>
  );
};
