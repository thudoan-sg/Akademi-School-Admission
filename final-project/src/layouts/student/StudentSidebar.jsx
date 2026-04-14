import { Menu, Button } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  BookOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

function StudentSidebar({ setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      key: "/student/profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "/student/schedule",
      icon: <CalendarOutlined />,
      label: "Schedule",
    },
    {
      key: "/student/scores",
      icon: <FileTextOutlined />,
      label: "Scores",
    },
    {
      key: "/student/materials",
      icon: <BookOutlined />,
      label: "Materials",
    },
  ];
  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <div
      style={{
        width: 220,
        background: "#fff",
        padding: 16,
        borderRight: "1px solid #eee",
        boxShadow: "2px 0 8px rgba(0,0,0,0.04)"
      }}
    >
      <h1 className="logo">Akademi</h1>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        onClick={({ key }) => navigate(key)}
        style={{
          border: "none"
        }}
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

export default StudentSidebar;