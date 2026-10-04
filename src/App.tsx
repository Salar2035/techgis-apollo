import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardOverview } from './components/DashboardOverview';
import { DesignationManagement } from './components/DesignationManagement';
import { DailyTasks } from './components/DailyTasks';
import { EODReports } from './components/EODReports';
import { SystemsMonitoring } from './components/SystemsMonitoring';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main style={{ flex: 1, minHeight: 'calc(100vh - 70px)', overflowY: 'auto' }}>
      {activeTab === 'dashboard' && <DashboardOverview />}
      {activeTab === 'designations' && <DesignationManagement />}
      {activeTab === 'tasks' && <DailyTasks />}
      {activeTab === 'eod' && <EODReports />}
      {activeTab === 'systems' && <SystemsMonitoring />}
    </main>
  );
};

export function App() {
  return (
    <AppProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ display: 'flex', flex: 1 }}>
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
