import { Menu, Button } from "antd";
import {
  DashboardOutlined,
  BookOutlined,
  FileTextOutlined,
  CalendarOutlined, // 👈 thêm
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

function TeacherSidebar({ setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      key: "/teacher",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/teacher/scores",
      icon: <BookOutlined />,
      label: "Manage Scores",
    },
    {
      key: "/teacher/materials",
      icon: <FileTextOutlined />,
      label: "Materials",
    },
    {
      key: "/teacher/schedule", // 🔥 NEW
      icon: <CalendarOutlined />,
      label: "Schedule",
    },
  ];

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div
      style={{
        width: 260,
        background: "#fff",
        padding: 16,
        borderRight: "1px solid #eee",
      }}
    >
      <h1 className="logo">Akademi</h1>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        onClick={({ key }) => navigate(key)}
      />

      <Button
        danger
        style={{ marginTop: 20, width: "100%" }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
}

export default TeacherSidebar;  