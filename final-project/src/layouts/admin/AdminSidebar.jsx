import { Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

function AdminSidebar() {
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

  return (
    <div
      style={{
        width: 200,
        background: "#fff",
        padding: 12,
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
    </div>
  );
}

export default AdminSidebar;