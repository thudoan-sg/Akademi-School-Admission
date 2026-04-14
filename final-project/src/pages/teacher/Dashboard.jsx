import { useEffect, useState } from "react";

function TeacherDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    materials: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, materialsRes] = await Promise.all([
          fetch("https://mindx-mockup-server.vercel.app/api/resources/students?apiKey=69ca789b3bb225ca08190764"),
          fetch("https://mindx-mockup-server.vercel.app/api/resources/materials?apiKey=69ca789b3bb225ca08190764"),
        ]);

        const studentsData = await studentsRes.json();
        const materialsData = await materialsRes.json();

        setStats({
          students: studentsData?.data?.data?.length || 0,
          materials: materialsData?.data?.data?.length || 0,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="section-title">Teacher Dashboard</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <Card title="Students" value={stats.students} />
        <Card title="Materials" value={stats.materials} />
      </div>

      <div style={{ marginTop: 30 }}>
        <h2 className="section-title">Quick Actions</h2>

        <div style={{ display: "flex", gap: 16 }}>
          <ActionCard text="Add Score" />
          <ActionCard text="Upload Material" />
        </div>
      </div>
    </div>
  );
}

/* reuse UI giống Admin */
function Card({ title, value }) {
  return (
    <div style={{
      flex: 1,
      padding: 20,
      borderRadius: 16,
      background: "#fff",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
    }}>
      <h3 style={{ color: "#666" }}>{title}</h3>
      <h1 style={{ color: "#20c997", margin: "10px 0" }}>{value}</h1>
    </div>
  );
}

function ActionCard({ text }) {
  return (
    <div style={{
      padding: 16,
      borderRadius: 12,
      background: "#20c997",
      color: "#fff",
      cursor: "pointer",
      flex: 1,
      textAlign: "center",
      fontWeight: 500
    }}>
      {text}
    </div>
  );
}

export default TeacherDashboard;