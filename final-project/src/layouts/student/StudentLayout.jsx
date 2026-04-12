import { Outlet } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";

function StudentLayout({ user, setUser }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>


      <StudentSidebar setUser={setUser} />


      <div style={{ flex: 1, position: "relative" }}>


        <div className="top-banner" />

        <div className="banner-overlay" />

        <div style={{ padding: 24, position: "relative", zIndex: 1 }}>
          <Outlet context={{ user }} />
        </div>

      </div>
    </div>
  );
}

export default StudentLayout;