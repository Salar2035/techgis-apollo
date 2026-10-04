import React from 'react';
import { useApp } from '../context/AppContext';
import { Cpu, Server, RefreshCw } from 'lucide-react';

export const SystemsMonitoring: React.FC = () => {
  const { systemHealth } = useApp();

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>
              System Usage & GIS Infrastructure Health
            </h2>
            <span className="badge badge-admin">
              <Cpu size={12} /> Real-Time Telemetry
            </span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>
            Live status of Tech-GIS GeoServer clusters, PostGIS database clusters, and deployment pipelines.
          </p>
        </div>

        <button className="btn-secondary" onClick={() => window.location.reload()}>
          <RefreshCw size={16} /> Refresh Metrics
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        {systemHealth.map((sys, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(6, 182, 212, 0.15)', padding: '10px', borderRadius: '10px' }}>
                <Server size={22} color="#06b6d4" />
              </div>
              <span className={`badge ${sys.status === 'OPTIMAL' ? 'badge-admin' : 'badge-high'}`}>
                {sys.status}
              </span>
            </div>

            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{sys.name}</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Category: {sys.category}</div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.8rem', color: '#94a3b8' }}>
              <div>Uptime: <strong style={{ color: '#10b981' }}>{sys.uptime}</strong></div>
              <div>Latency: <strong style={{ color: '#06b6d4' }}>{sys.latencyMs} ms</strong></div>
            </div>

            {/* Load bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>
                <span>Server Compute Load</span>
                <span style={{ color: sys.loadPercent > 80 ? '#fbbf24' : '#34d399', fontWeight: 700 }}>{sys.loadPercent}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${sys.loadPercent}%`,
                    height: '100%',
                    background: sys.loadPercent > 80 ? 'linear-gradient(90deg, #f59e0b, #f43f5e)' : 'linear-gradient(90deg, #06b6d4, #10b981)',
                    borderRadius: '3px',
                  }}
                />
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
