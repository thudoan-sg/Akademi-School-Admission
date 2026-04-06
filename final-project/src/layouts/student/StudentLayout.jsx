import { Outlet } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import StudentNavbar from "./StudentNavbar";

export default function StudentLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <StudentNavbar />

        {/* Nội dung thay đổi */}
        <div className="p-6">
          <Outlet />   {/* 🔥 QUAN TRỌNG */}
        </div>
      </div>
    </div>
  );
}