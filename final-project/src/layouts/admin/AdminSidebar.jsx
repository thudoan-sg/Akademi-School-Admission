import { Menu, Button } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

function AdminSidebar({ setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      key: "/admin",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/admin/students",
      icon: <UserOutlined />,
      label: "Students",
    },
    {
      key: "/admin/teachers",
      icon: <TeamOutlined />,
      label: "Teachers",
    },
    {
      key: "/admin/schedule",
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

export default AdminSidebar;