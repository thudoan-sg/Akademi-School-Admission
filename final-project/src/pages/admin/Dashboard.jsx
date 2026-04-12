import { useEffect, useState } from "react";

function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    schedule: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, teachersRes, scheduleRes] = await Promise.all([
          fetch("https://mindx-mockup-server.vercel.app/api/resources/students?apiKey=69ca789b3bb225ca08190764"),
          fetch("https://mindx-mockup-server.vercel.app/api/resources/teachers?apiKey=69ca789b3bb225ca08190764"),
          fetch("https://mindx-mockup-server.vercel.app/api/resources/schedule?apiKey=69ca789b3bb225ca08190764"),
        ]);

        const studentsData = await studentsRes.json();
        const teachersData = await teachersRes.json();
        const scheduleData = await scheduleRes.json();

        setStats({
          students: studentsData?.data?.data?.length || 0,
          teachers: teachersData?.data?.data?.length || 0,
          schedule: scheduleData?.data?.data?.length || 0,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="section-title">Dashboard</h1>

      
      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <Card title="Students" value={stats.students} extra="+N this week" />
        <Card title="Teachers" value={stats.teachers} extra="+N new" />
        <Card title="Schedule" value={stats.schedule} extra="Updated today" />
      </div>

      {/* QUICK ACTION */}
      <div style={{ marginTop: 30 }}>
        <h2 className="section-title">Quick Actions</h2>

        <div style={{ display: "flex", gap: 16 }}>
          <ActionCard text="Add Student" />
          <ActionCard text="Add Teacher" />
          <ActionCard text="Create Schedule" />
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div style={{ marginTop: 30 }}>
        <h2 className="section-title">Recent Activity</h2>

        <div style={{
          background: "#fff",
          padding: 20,
          borderRadius: 12,
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
        }}>
          <Activity text="Added new student Nguyen Van A" />
          <Activity text="Teacher Tran B updated materials" />
          <Activity text="Schedule updated for class 10A1" />
          <Activity text="New teacher assigned to Math" />
        </div>
      </div>
    </div>
  );
}

/* CARD */
function Card({ title, value, extra }) {
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
      <p style={{ fontSize: 12, color: "#999" }}>{extra}</p>
    </div>
  );
}

/* ACTION */
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


function Activity({ text }) {
  return (
    <p style={{ marginBottom: 10, color: "#555" }}>
      • {text}
    </p>
  );
}

export default AdminDashboard;