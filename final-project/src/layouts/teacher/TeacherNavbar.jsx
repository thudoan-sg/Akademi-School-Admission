import { Avatar } from "antd";

function TeacherNavbar() {
  return (
    <div
      style={{
        background: "#fff",
        padding: "12px 20px",
        borderBottom: "1px solid #eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3 style={{ margin: 0 }}>Dashboard</h3>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span>Teacher</span>
        <Avatar>T</Avatar>
      </div>
    </div>
  );
}

export default TeacherNavbar;