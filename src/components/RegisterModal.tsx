import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, UserPlus } from 'lucide-react';
import type { Role } from '../types';

interface Props {
  onClose: () => void;
}

export const RegisterModal: React.FC<Props> = ({ onClose }) => {
  const { registerUser } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('Geospatial Analytics');
  const [roleCategory, setRoleCategory] = useState<'INTERN' | 'MEMBER' | 'HOD' | 'ADMIN'>('MEMBER');
  const [designation, setDesignation] = useState('');

  const handleRoleChange = (cat: 'INTERN' | 'MEMBER' | 'HOD' | 'ADMIN') => {
    setRoleCategory(cat);
    if (cat === 'INTERN') {
      setDesignation('GIS Trainee Intern');
    } else if (cat === 'HOD') {
      setDesignation(`Head of ${department}`);
    } else if (cat === 'ADMIN') {
      setDesignation('System Administrator');
    } else {
      setDesignation('GIS Specialist');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !designation) return;

    let systemRole: Role = 'MEMBER';
    if (roleCategory === 'ADMIN') systemRole = 'ADMIN';
    if (roleCategory === 'HOD') systemRole = 'HOD';

    registerUser({
      name,
      email,
      department,
      role: systemRole,
      designation: designation || (roleCategory === 'INTERN' ? 'GIS Intern' : 'Staff Member'),
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel" style={{ width: '100%', maxWidth: '580px', padding: '26px', background: '#0f172a', border: '1px solid rgba(6, 182, 212, 0.4)' }}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'rgba(6, 182, 212, 0.15)', padding: '10px', borderRadius: '10px' }}>
              <UserPlus size={22} color="#06b6d4" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>
                Create New Personnel Account
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Onboard interns, specialists, department heads, or administrators into TechGIS Apollo.
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                Full Name *
              </label>
              <input
                type="text"
                className="glass-input"
                placeholder="e.g. Usama Hassan"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                Corporate Email Address *
              </label>
              <input
                type="email"
                className="glass-input"
                placeholder="e.g. usama@techgis.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                Department *
              </label>
              <select
                className="glass-input"
                value={department}
                onChange={e => setDepartment(e.target.value)}
                style={{ background: '#1e293b' }}
              >
                <option value="Geospatial Analytics">Geospatial Analytics</option>
                <option value="GIS Infrastructure">GIS Infrastructure</option>
                <option value="Drone & Field Operations">Drone & Field Operations</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Mining Dept">Mining Dept</option>
                <option value="Internship & Trainee Program">Internship & Trainee Program</option>
                <option value="Executive Management">Executive Management</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                Position Category *
              </label>
              <select
                className="glass-input"
                value={roleCategory}
                onChange={e => handleRoleChange(e.target.value as any)}
                style={{ background: '#1e293b' }}
              >
                <option value="INTERN">Intern / Trainee</option>
                <option value="MEMBER">Team Member / Specialist</option>
                <option value="HOD">Head of Department (HOD)</option>
                <option value="ADMIN">System Administrator</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
              Specific Designation / Job Title *
            </label>
            <input
              type="text"
              className="glass-input"
              placeholder="e.g. GIS Trainee Intern, Cartographer, Senior Python Developer"
              value={designation}
              onChange={e => setDesignation(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
              Account Password *
            </label>
            <input
              type="password"
              className="glass-input"
              placeholder="••••••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.2)', padding: '10px 14px', borderRadius: '8px', fontSize: '0.78rem', color: '#cbd5e1' }}>
            <strong>Account Setup Complete:</strong> Once created, you will automatically be logged in and registered in the TechGIS Apollo database directory.
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Account & Log In
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
