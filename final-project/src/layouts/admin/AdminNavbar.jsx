import { Avatar } from "antd";

function AdminNavbar() {
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
        <span>Admin</span>
        <Avatar>U</Avatar>
      </div>
    </div>
  );
}

export default AdminNavbar;