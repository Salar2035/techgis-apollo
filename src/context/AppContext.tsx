import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, DesignationProposal, DailyTask, EODReport, SystemHealth, Role } from '../types';
import { INITIAL_USERS, INITIAL_PROPOSALS, INITIAL_TASKS, INITIAL_EOD_REPORTS, SYSTEM_HEALTH_DATA } from '../mockData';

interface AppContextType {
  currentUser: User;
  users: User[];
  proposals: DesignationProposal[];
  tasks: DailyTask[];
  eodReports: EODReport[];
  systemHealth: SystemHealth[];
  setCurrentUser: (user: User) => void;
  registerUser: (userData: {
    name: string;
    email: string;
    department: string;
    role: Role;
    designation: string;
  }) => User;
  createDesignationProposal: (targetUserId: string, proposedDesignation: string, reason: string) => void;
  approveDesignationProposal: (proposalId: string) => void;
  rejectDesignationProposal: (proposalId: string) => void;
  createTask: (task: Omit<DailyTask, 'id' | 'createdAt' | 'status' | 'assignedById' | 'assignedByName' | 'assignedByDesignation'>) => void;
  acceptTask: (taskId: string) => void;
  declineTask: (taskId: string, reason: string) => void;
  completeTask: (taskId: string) => void;
  submitEODReport: (completedTaskIds: string[], completedTaskTitles: string[], additional: string, hours: number, blockers?: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_KEY_USERS = 'techgis_apollo_users_v3';
const LOCAL_KEY_PROPOSALS = 'techgis_apollo_proposals_v3';
const LOCAL_KEY_TASKS = 'techgis_apollo_tasks_v3';
const LOCAL_KEY_EOD = 'techgis_apollo_eod_v3';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(LOCAL_KEY_USERS);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    return users.find(u => u.email === 'salar@techgis.com') || users[0];
  });

  const [proposals, setProposals] = useState<DesignationProposal[]>(() => {
    const saved = localStorage.getItem(LOCAL_KEY_PROPOSALS);
    return saved ? JSON.parse(saved) : INITIAL_PROPOSALS;
  });

  const [tasks, setTasks] = useState<DailyTask[]>(() => {
    const saved = localStorage.getItem(LOCAL_KEY_TASKS);
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [eodReports, setEodReports] = useState<EODReport[]>(() => {
    const saved = localStorage.getItem(LOCAL_KEY_EOD);
    return saved ? JSON.parse(saved) : INITIAL_EOD_REPORTS;
  });

  const [systemHealth] = useState<SystemHealth[]>(SYSTEM_HEALTH_DATA);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY_USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY_PROPOSALS, JSON.stringify(proposals));
  }, [proposals]);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY_TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY_EOD, JSON.stringify(eodReports));
  }, [eodReports]);

  // Register New Account
  const registerUser = (data: {
    name: string;
    email: string;
    department: string;
    role: Role;
    designation: string;
  }): User => {
    const isAdmin = data.role === 'ADMIN';
    const avatarList = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    ];
    const avatar = avatarList[users.length % avatarList.length];

    const newUser: User = {
      id: 'usr_' + Date.now(),
      email: data.email.trim().toLowerCase(),
      name: data.name.trim(),
      role: data.role,
      department: data.department,
      designation: data.designation.trim(),
      avatar,
      isAdmin,
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser); // Automatically log into the newly created account
    return newUser;
  };

  // Handle Designation Proposal creation
  const createDesignationProposal = (targetUserId: string, proposedDesignation: string, reason: string) => {
    const targetUser = users.find(u => u.id === targetUserId);
    if (!targetUser) return;

    const adminUsers = users.filter(u => u.isAdmin);
    const requiredApprovals = Math.max(1, adminUsers.length);

    const newProposal: DesignationProposal = {
      id: 'prop_' + Date.now(),
      targetUserId: targetUser.id,
      targetUserName: targetUser.name,
      targetUserEmail: targetUser.email,
      currentDesignation: targetUser.designation,
      proposedDesignation,
      proposedByAdminId: currentUser.id,
      proposedByAdminName: currentUser.name,
      reason,
      requiredApprovals,
      approvedByAdminIds: [currentUser.id], // Auto-vote creator
      status: requiredApprovals === 1 ? 'APPROVED' : 'PENDING_APPROVAL',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (newProposal.status === 'APPROVED') {
      setUsers(prev => prev.map(u => u.id === targetUserId ? { ...u, designation: proposedDesignation } : u));
    }

    setProposals(prev => [newProposal, ...prev]);
  };

  // Approve Designation Proposal
  const approveDesignationProposal = (proposalId: string) => {
    setProposals(prev => prev.map(prop => {
      if (prop.id !== proposalId) return prop;
      if (prop.approvedByAdminIds.includes(currentUser.id)) return prop;

      const newApprovedIds = [...prop.approvedByAdminIds, currentUser.id];
      const isNowFullyApproved = newApprovedIds.length >= prop.requiredApprovals;

      if (isNowFullyApproved) {
        setUsers(uList => uList.map(u => u.id === prop.targetUserId ? { ...u, designation: prop.proposedDesignation } : u));
      }

      return {
        ...prop,
        approvedByAdminIds: newApprovedIds,
        status: isNowFullyApproved ? 'APPROVED' : 'PENDING_APPROVAL',
        updatedAt: new Date().toISOString(),
      };
    }));
  };

  // Reject Designation Proposal
  const rejectDesignationProposal = (proposalId: string) => {
    setProposals(prev => prev.map(prop => {
      if (prop.id !== proposalId) return prop;
      return {
        ...prop,
        status: 'REJECTED',
        updatedAt: new Date().toISOString(),
      };
    }));
  };

  // Create Task
  const createTask = (taskData: Omit<DailyTask, 'id' | 'createdAt' | 'status' | 'assignedById' | 'assignedByName' | 'assignedByDesignation'>) => {
    const newTask: DailyTask = {
      ...taskData,
      id: 'task_' + Date.now(),
      status: 'PENDING_ACCEPTANCE',
      assignedById: currentUser.id,
      assignedByName: currentUser.name,
      assignedByDesignation: currentUser.designation,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  // Accept Task
  const acceptTask = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      return {
        ...t,
        status: 'IN_PROGRESS',
        acceptedAt: new Date().toISOString(),
      };
    }));
  };

  // Decline Task
  const declineTask = (taskId: string, reason: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      return {
        ...t,
        status: 'DECLINED',
        declineReason: reason,
      };
    }));
  };

  // Complete Task
  const completeTask = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      return {
        ...t,
        status: 'COMPLETED',
        completedAt: new Date().toISOString(),
      };
    }));
  };

  // Submit End of Day Report
  const submitEODReport = (completedTaskIds: string[], completedTaskTitles: string[], additional: string, hours: number, blockers?: string) => {
    const newReport: EODReport = {
      id: 'eod_' + Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userDesignation: currentUser.designation,
      department: currentUser.department,
      date: new Date().toISOString().split('T')[0],
      completedTaskIds,
      completedTaskTitles,
      additionalAccomplishments: additional,
      totalHoursLogged: hours,
      blockersEncountered: blockers,
      submittedAt: new Date().toISOString(),
    };

    completedTaskIds.forEach(tId => completeTask(tId));
    setEodReports(prev => [newReport, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        proposals,
        tasks,
        eodReports,
        systemHealth,
        setCurrentUser,
        registerUser,
        createDesignationProposal,
        approveDesignationProposal,
        rejectDesignationProposal,
        createTask,
        acceptTask,
        declineTask,
        completeTask,
        submitEODReport,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
