import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminLayout({ setUser }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      <AdminSidebar setUser={setUser} />

  
      <div style={{ flex: 1, position: "relative" }}>
        
        
        <div className="dashboard-bg" />

        
        <div style={{ padding: 24, position: "relative", zIndex: 1 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;