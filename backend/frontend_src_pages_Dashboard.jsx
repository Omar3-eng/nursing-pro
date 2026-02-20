import React, { useState, useEffect } from 'react';
import { Users, Calendar, Pill, AlertCircle } from 'lucide-react';
import api from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    upcomingAppointments: 0,
    activeMedications: 0,
    alerts: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const patientsRes = await api.get('/patients');
      const appointmentsRes = await api.get('/appointments');
      
      setStats({
        totalPatients: patientsRes.data.length,
        upcomingAppointments: appointmentsRes.data.filter(a => a.status === 'scheduled').length,
        activeMedications: 0,
        alerts: 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Users}
          title="Total Patients"
          value={stats.totalPatients}
          color="blue"
        />
        <StatCard
          icon={Calendar}
          title="Upcoming Appointments"
          value={stats.upcomingAppointments}
          color="green"
        />
        <StatCard
          icon={Pill}
          title="Active Medications"
          value={stats.activeMedications}
          color="purple"
        />
        <StatCard
          icon={AlertCircle}
          title="Alerts"
          value={stats.alerts}
          color="red"
        />
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h2>
        <div className="text-gray-600 text-center py-8">
          No recent activities
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, color }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    red: 'bg-red-50 text-red-600 border-red-200',
  };

  return (
    <div className={`${colorClasses[color]} border rounded-lg p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <Icon size={40} opacity={0.2} />
      </div>
    </div>
  );
}