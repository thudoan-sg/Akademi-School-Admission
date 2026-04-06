import { Outlet } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import StudentNavbar from "./StudentNavbar";

function StudentLayout({ user }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <StudentNavbar />

        {/* Nội dung */}
        <div className="p-6">
          <Outlet context={{ user }} />
        </div>
      </div>
    </div>
  );
}

export default StudentLayout;