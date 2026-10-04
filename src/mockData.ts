import type { User, DesignationProposal, DailyTask, EODReport, SystemHealth } from './types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr_salar',
    email: 'salar@techgis.com',
    name: 'Salar TechGIS',
    role: 'ADMIN',
    department: 'Executive Management',
    designation: 'Chief Operations Officer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    isAdmin: true,
  }
];

export const INITIAL_PROPOSALS: DesignationProposal[] = [];

export const INITIAL_TASKS: DailyTask[] = [
  {
    id: 'task_init_1',
    title: 'Company Management System Initialization & Personnel Onboarding',
    description: 'Welcome to TechGIS Apollo Enterprise Management System. As system administrator, proceed to onboard team members and department heads into the system.',
    assigneeId: 'usr_salar',
    assigneeName: 'Salar TechGIS',
    assigneeEmail: 'salar@techgis.com',
    assignedById: 'usr_salar',
    assignedByName: 'Salar TechGIS',
    assignedByDesignation: 'Chief Operations Officer',
    department: 'Executive Management',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    acceptedAt: '2026-10-04T08:00:00Z',
    dueDate: '2026-10-04T18:00:00Z',
    estimatedHours: 2.0,
    createdAt: '2026-10-04T08:00:00Z',
  }
];

export const INITIAL_EOD_REPORTS: EODReport[] = [];

export const SYSTEM_HEALTH_DATA: SystemHealth[] = [
  {
    name: 'GeoServer Cluster (Node-01)',
    category: 'GIS Cluster',
    status: 'OPTIMAL',
    uptime: '99.98%',
    latencyMs: 24,
    loadPercent: 42,
  },
  {
    name: 'PostGIS Enterprise Master DB',
    category: 'Database',
    status: 'OPTIMAL',
    uptime: '99.99%',
    latencyMs: 12,
    loadPercent: 58,
  },
  {
    name: 'Drone Orthomosaic Render Engine',
    category: 'Processing',
    status: 'OPTIMAL',
    uptime: '99.50%',
    latencyMs: 85,
    loadPercent: 48,
  },
  {
    name: 'Vercel Deployment Proxy (Tech-GIS Apollo)',
    category: 'Deployment',
    status: 'OPTIMAL',
    uptime: '100.00%',
    latencyMs: 38,
    loadPercent: 29,
  },
];
