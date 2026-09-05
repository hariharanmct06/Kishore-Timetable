import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function MockTestChart({ mockTests = [] }) {
  if (mockTests.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400 text-xs">
        No mock tests logged yet. Log your first test below!
      </div>
    );
  }

  const labels = mockTests.map((t, idx) => `Test #${idx + 1} (${t.date})`);

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Score (Out of 300)',
        data: mockTests.map((t) => t.totalScore),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.3,
        borderWidth: 3
      },
      {
        label: 'Physics',
        data: mockTests.map((t) => t.physicsScore),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
        borderDash: [5, 5]
      },
      {
        label: 'Chemistry',
        data: mockTests.map((t) => t.chemistryScore),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.3,
        borderDash: [5, 5]
      },
      {
        label: 'Maths',
        data: mockTests.map((t) => t.mathsScore),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.5)',
        tension: 0.3,
        borderDash: [5, 5]
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#94a3b8',
          font: { size: 11 }
        }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#f8fafc',
        bodyColor: '#e2e8f0',
        borderColor: '#334155',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(51, 65, 85, 0.3)' },
        ticks: { color: '#94a3b8', font: { size: 10 } }
      },
      y: {
        grid: { color: 'rgba(51, 65, 85, 0.3)' },
        ticks: { color: '#94a3b8', font: { size: 10 } },
        min: 0,
        max: 300
      }
    }
  };

  return (
    <div className="h-64 w-full">
      <Line data={data} options={options} />
    </div>
  );
}
