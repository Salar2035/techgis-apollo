export type Role = 'ADMIN' | 'HOD' | 'MEMBER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  department: string;
  designation: string;
  avatar: string;
  isAdmin: boolean;
}

export interface DesignationProposal {
  id: string;
  targetUserId: string;
  targetUserName: string;
  targetUserEmail: string;
  currentDesignation: string;
  proposedDesignation: string;
  proposedByAdminId: string;
  proposedByAdminName: string;
  reason: string;
  requiredApprovals: number;
  approvedByAdminIds: string[];
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

export type TaskPriority = 'URGENT' | 'HIGH' | 'MEDIUM' | 'ROUTINE';
export type TaskStatus = 'PENDING_ACCEPTANCE' | 'IN_PROGRESS' | 'COMPLETED' | 'DECLINED';

export interface DailyTask {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  assigneeName: string;
  assigneeEmail: string;
  assignedById: string;
  assignedByName: string;
  assignedByDesignation: string;
  department: string;
  priority: TaskPriority;
  status: TaskStatus;
  declineReason?: string;
  acceptedAt?: string;
  completedAt?: string;
  dueDate: string;
  estimatedHours: number;
  createdAt: string;
  clientName?: string;
}

export interface EODReport {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userDesignation: string;
  department: string;
  date: string;
  completedTaskIds: string[];
  completedTaskTitles: string[];
  additionalAccomplishments: string;
  totalHoursLogged: number;
  blockersEncountered?: string;
  submittedAt: string;
}

export interface SystemHealth {
  name: string;
  category: 'GIS Cluster' | 'Database' | 'Processing' | 'Deployment' | 'Command Center';
  status: 'OPTIMAL' | 'WARNING' | 'CRITICAL';
  uptime: string;
  latencyMs: number;
  loadPercent: number;
}

export interface TechGISWorkstream {
  id: string;
  client: string;
  title: string;
  category: 'Geospatial & Drone' | 'Smart City & Digital Twins' | 'IoT & Mesh' | 'Software & PostGIS' | 'Mining Dept';
  status: 'Demo Ready' | 'In Progress' | 'Awaiting Review' | 'QC Stage' | 'Blocked';
  progressPercent: number;
  leadPerson: string;
  targetDeadline: string;
}
