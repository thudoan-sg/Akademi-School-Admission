import { Outlet } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";

function TeacherLayout({ user, setUser }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      <TeacherSidebar setUser={setUser} />

      <div style={{ flex: 1, position: "relative" }}>
        
        <div className="dashboard-bg" />

        <div style={{ padding: 24, position: "relative", zIndex: 1 }}>
  
          <Outlet context={{ user }} />
        </div>
      </div>
    </div>
  );
}

export default TeacherLayout;