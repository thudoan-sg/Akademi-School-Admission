import { Menu } from "antd";
import {
  DashboardOutlined,
  FileTextOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

function TeacherSidebar() {
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
      icon: <FileTextOutlined />,
      label: "Scores",
    },
    {
      key: "/teacher/materials",
      icon: <BookOutlined />,
      label: "Materials",
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

export default TeacherSidebar;