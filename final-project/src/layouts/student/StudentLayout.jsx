import StudentSidebar from "./StudentSidebar";
import StudentNavbar from "./StudentNavbar";

export default function StudentLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <StudentSidebar />

      <div className="flex-1 flex flex-col">
        <StudentNavbar />
        <div className="p-6 overflow-auto">{children}</div>
      </div>
    </div>
  );
}