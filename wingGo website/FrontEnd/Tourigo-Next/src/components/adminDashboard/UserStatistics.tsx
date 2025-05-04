"use client";
import React, { useEffect, useState } from "react";
import { fetchUserStatistics } from "@/api/adminApi"; // Ensure this is imported correctly
import { toast } from "sonner";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const UserStatistics = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [newUsersByMonth, setNewUsersByMonth] = useState<{ _id: string; newUsers: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await fetchUserStatistics();
        setTotalUsers(data.totalUsers);
        setNewUsersByMonth(data.newUsersByMonth);
      } catch (error) {
        toast.error("Error fetching user statistics.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const chartData = {
    labels: newUsersByMonth.map((item) => item._id || "Unknown"),
    datasets: [
      {
        label: "New Users",
        data: newUsersByMonth.map((item) => item.newUsers),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <section className="user-statistics-area section-space">
      <div className="container">
        <h2 className="team-single-title mb-20">Users Statistics</h2>

        
        <p>
          <strong>Total Users:</strong> {totalUsers}
        </p>
        <div className="chart-container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </section>
  );
};

export default UserStatistics;
