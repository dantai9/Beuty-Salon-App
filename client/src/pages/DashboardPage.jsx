import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import Loader from '../components/Loader.jsx';
import StatCard from '../components/StatCard.jsx';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user, token } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = [
          fetch('/api/appointments', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ];

        if (user?.salon) {
          requests.push(
            fetch(`/api/salons/${user.salon}/stats`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          );
        }

        const responses = await Promise.all(requests);
        const appointmentsRes = responses[0];
        const statsRes = responses[1];

        if (appointmentsRes?.ok) {
          const appointmentsData = await appointmentsRes.json();
          setAppointments(appointmentsData.appointments || []);
        }

        if (statsRes?.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, user?.salon]);

  const upcoming = useMemo(
    () => appointments.filter((appointment) => new Date(appointment.scheduledAt) > new Date()),
    [appointments]
  );

  const completed = appointments.filter((appointment) => appointment.status === 'completed');

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-hero glass-panel">
        <h1>Hi {user?.name.split(' ')[0]}, here’s your schedule overview</h1>
        <p>
          Track appointments, manage salon availability, and celebrate glowing client feedback in one
          minimal dashboard.
        </p>
      </header>
      <section className="dashboard-stats">
        <StatCard
          title="Upcoming appointments"
          value={upcoming.length}
          caption="Within the next 30 days"
          trend={`+${Math.max(upcoming.length - 2, 0)} this week`}
        />
        <StatCard
          title="Completed visits"
          value={completed.length}
          caption="Clients pampered to perfection"
          trend={completed.length ? `+${completed.length} smiles` : null}
        />
        <StatCard
          title="Average rating"
          value={(stats?.reviewStats?.averageRating || 0).toFixed(1)}
          caption={`${stats?.reviewStats?.reviewCount || 0} total reviews`}
          trend={stats?.reviewStats?.reviewCount ? '+steady' : null}
        />
      </section>
      <section className="dashboard-table glass-panel">
        <h2>Appointment timeline</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Client</th>
              <th>Service</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{new Date(appointment.scheduledAt).toLocaleString()}</td>
                <td>{appointment.client?.name || 'You'}</td>
                <td>{appointment.service}</td>
                <td>
                  <span className={`status-pill ${appointment.status}`}>{appointment.status}</span>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan="4" className="empty">
                  No appointments yet. Share your booking link to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default DashboardPage;
