import type { User, DesignationProposal, DailyTask, EODReport, SystemHealth, TechGISWorkstream } from './types';

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

export const TECHGIS_WORKSTREAMS: TechGISWorkstream[] = [
  {
    id: 'ws_ndma',
    client: 'NDMA (National Disaster Management Authority)',
    title: 'Android Rescue MVP & Bluetooth Mesh Atlas Integration',
    category: 'IoT & Mesh',
    status: 'In Progress',
    progressPercent: 82,
    leadPerson: 'Salar TechGIS',
    targetDeadline: '2026-10-15',
  },
  {
    id: 'ws_dha',
    client: 'DHA Islamabad',
    title: 'Arcadya Estate OS & Vessel Town 3D Showcase',
    category: 'Smart City & Digital Twins',
    status: 'Demo Ready',
    progressPercent: 100,
    leadPerson: 'Salar TechGIS',
    targetDeadline: '2026-10-10',
  },
  {
    id: 'ws_faisal',
    client: 'Faisal Town Group',
    title: 'Sector 4 DEM Volumetric Raster Elevation Mapping',
    category: 'Geospatial & Drone',
    status: 'In Progress',
    progressPercent: 68,
    leadPerson: 'Geospatial Lead',
    targetDeadline: '2026-10-12',
  },
  {
    id: 'ws_kelectric',
    client: 'K-Electric',
    title: 'Grid Station 12-B LiDAR LAS Point Cloud Vegetation Classification',
    category: 'Geospatial & Drone',
    status: 'QC Stage',
    progressPercent: 90,
    leadPerson: 'LiDAR Specialist',
    targetDeadline: '2026-10-08',
  },
  {
    id: 'ws_csc',
    client: 'Capital Smart City',
    title: 'Safe Smart Drive Telematics & Video Processing',
    category: 'Smart City & Digital Twins',
    status: 'Awaiting Review',
    progressPercent: 95,
    leadPerson: 'Salar TechGIS',
    targetDeadline: '2026-10-20',
  },
];

export const INITIAL_TASKS: DailyTask[] = [
  {
    id: 'task_001',
    title: 'Faisal Town Sector 4 DEM Volumetric Raster Clipping',
    description: 'Execute high-resolution DEM raster clipping and contour generation for Faisal Town Sector 4. Validate 3D elevation rasters against ground control points and publish to GeoServer layer cluster.',
    assigneeId: 'usr_salar',
    assigneeName: 'Salar TechGIS',
    assigneeEmail: 'salar@techgis.com',
    assignedById: 'usr_salar',
    assignedByName: 'Salar TechGIS',
    assignedByDesignation: 'Chief Operations Officer',
    department: 'Geospatial Analytics',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    acceptedAt: '2026-10-04T08:00:00Z',
    dueDate: '2026-10-04T18:00:00Z',
    estimatedHours: 4.5,
    createdAt: '2026-10-04T08:00:00Z',
    clientName: 'Faisal Town Group',
  },
  {
    id: 'task_002',
    title: 'NDMA Bluetooth Mesh Hardware Packet Relay Testing',
    description: 'Run 5-node Bluetooth mesh offline communication benchmark for emergency rescue operations. Log packet loss metrics and sync location payload data into Atlas desktop command center.',
    assigneeId: 'usr_salar',
    assigneeName: 'Salar TechGIS',
    assigneeEmail: 'salar@techgis.com',
    assignedById: 'usr_salar',
    assignedByName: 'Salar TechGIS',
    assignedByDesignation: 'Chief Operations Officer',
    department: 'IoT & Mesh',
    priority: 'URGENT',
    status: 'PENDING_ACCEPTANCE',
    dueDate: '2026-10-04T19:00:00Z',
    estimatedHours: 3.5,
    createdAt: '2026-10-04T09:00:00Z',
    clientName: 'NDMA',
  }
];

export const INITIAL_EOD_REPORTS: EODReport[] = [];

export const SYSTEM_HEALTH_DATA: SystemHealth[] = [
  {
    name: 'GeoServer Spatial Cluster (Node-01)',
    category: 'GIS Cluster',
    status: 'OPTIMAL',
    uptime: '99.98%',
    latencyMs: 24,
    loadPercent: 42,
  },
  {
    name: 'PostGIS Enterprise Master DB Cluster',
    category: 'Database',
    status: 'OPTIMAL',
    uptime: '99.99%',
    latencyMs: 12,
    loadPercent: 54,
  },
  {
    name: 'Drone Orthomosaic & LiDAR Render Engine',
    category: 'Processing',
    status: 'OPTIMAL',
    uptime: '99.50%',
    latencyMs: 78,
    loadPercent: 46,
  },
  {
    name: 'Atlas Command Center Telemetry Stream',
    category: 'Command Center',
    status: 'OPTIMAL',
    uptime: '99.95%',
    latencyMs: 18,
    loadPercent: 32,
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
