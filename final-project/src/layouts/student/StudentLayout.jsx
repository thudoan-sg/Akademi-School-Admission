import { Outlet } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import StudentNavbar from "./StudentNavbar";

function StudentLayout({ user }) {
  return (
    <div>
      <div className="top-banner" />

      <div style={{ display: "flex", height: "calc(100vh - 150px)" }}>
        <StudentSidebar />

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <StudentNavbar />

          <div style={{ padding: 24 }}>
            <Outlet context={{ user }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentLayout;