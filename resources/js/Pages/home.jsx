import React from 'react';
import Layout from '../Layouts/Layout';
import { Head, usePage } from '@inertiajs/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const { totalUsers, visitsToday, visitsData } = usePage().props;

  const labels = Object.keys(visitsData);
  const data = {
    labels,
    datasets: [
      {
        label: 'Daily Visits',
        data: Object.values(visitsData),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Layout>
      <Head title="Dashboard" />
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Revenue</h2>
            <p className="text-3xl font-bold text-green-600">$12,345</p>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Visits Today</h2>
            <p className="text-3xl font-bold text-purple-600">{visitsToday}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Daily Visits</h2>
          <Line data={data} options={options} />
        </div>
      </div>
    </Layout>
  );
}
