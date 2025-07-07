import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register the essential chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function DefectBarChart({ data, onBarClick }) {
  // Define the types of defects we're interested in
  const defectTypes = [
    "eye",
    "hearing",
    "fitness",
    "mental",
    "dental",
    "orthopedic",
    "ent",
  ];

  // Friendly labels for displaying on the chart
  const defectLabels = {
    eye: "Eye",
    hearing: "Hearing",
    fitness: "Fitness",
    mental: "Mental Health",
    dental: "Dental",
    orthopedic: "Orthopedic",
    ent: "ENT",
  };

  // Define a distinct color for each bar (defect type)
  const barColors = [
    "#3b82f6",
    "#facc15",
    "#10b981",
    "#ef4444",
    "#8b5cf6",
    "#f97316",
    "#14b8a6",
  ];

  // Count how many students have each type of defect using useMemo for optimization
  const defectCounts = useMemo(() => {
    const counts = Object.fromEntries(defectTypes.map((type) => [type, 0]));
    data.forEach((student) => {
      defectTypes.forEach((type) => {
        if (student.defects?.[type]) counts[type]++;
      });
    });
    return counts;
  }, [data]);

  // Prepare the data object to feed into Chart.js
  const chartData = {
    labels: defectTypes.map((type) => defectLabels[type]),
    datasets: [
      {
        label: "Number of Students",
        data: defectTypes.map((type) => defectCounts[type]),
        backgroundColor: barColors,
        borderColor: "#ffffff", // White border color
        borderWidth: 1, // Border thickness
        borderRadius: 8,
        barThickness: window.innerWidth < 768 ? 24 : 36,
        hoverBorderColor: "#f1f5f9", // Lighter border on hover
        hoverBorderWidth: 2,
      },
    ],
  };

  // Configuration options for how the bar chart should behave/look
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Let it scale based on container height
    layout: {
      padding: {
        bottom: window.innerWidth < 768 ? 50 : 30,
        left: 10,
        right: 10,
      },
    },
    animation: {
      duration: 700,
      easing: "easeInOutQuart", // Smooth transition on chart load
    },
    plugins: {
      legend: { display: false }, // Hide the legend since labels are obvious
      tooltip: {
        callbacks: {
          // Show a readable tooltip like: "4 students"
          label: (ctx) => `${ctx.raw} students`,
        },
        backgroundColor: "#1f2937",
        titleColor: "#f9fafb",
        bodyColor: "#d1d5db",
        borderColor: "#4b5563",
        borderWidth: 1,
        padding: 10,
      },
    },
    // Handle click on bars — pass defect type to parent component
    onClick: (_, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const clickedDefect = defectTypes[index];
        onBarClick(clickedDefect);
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#e2e8f0",
          stepSize: 1,
          precision: 0,
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
        title: {
          display: true,
          text: "Number of Students",
          color: "#f1f5f9",
          font: {
            size: window.innerWidth < 768 ? 10 : 13,
          },
        },
        grid: {
          color: "#374151",
        },
      },
      x: {
        ticks: {
          color: "#e2e8f0",
          autoSkip: false,
          maxRotation: 45,
          minRotation: 0,
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
        title: {
          display: true,
          text: "Health Categories",
          color: "#f1f5f9",
          font: {
            size: window.innerWidth < 768 ? 10 : 13,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full h-[420px] sm:h-[450px] md:h-[500px] p-4 md:p-6 rounded-xl shadow-lg border border-[#2e3248] overflow-hidden">
      {/* Header above the chart */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-1">
        <h2 className="text-lg md:text-lg font-menbere font-medium text-white">
          Students vs Health Defects
        </h2>
        <span className="text-xs md:text-sm text-slate-300">
          Click on a bar to explore
        </span>
      </div>

      {/* The Bar chart itself */}
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
