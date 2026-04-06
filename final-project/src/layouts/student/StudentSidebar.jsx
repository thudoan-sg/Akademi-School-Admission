import { Link } from "react-router-dom";

export default function StudentSidebar() {
  return (
    <div className="w-64 bg-white p-4">
      <h1 className="font-bold mb-6">Student</h1>

      <ul className="space-y-4">
        <li><Link to="/student/profile">Profile</Link></li>
        <li><Link to="/student/scores">Scores</Link></li>
        <li><Link to="/student/schedule">Schedule</Link></li>
        <li><Link to="/student/materials">Materials</Link></li>
      </ul>
    </div>
  );
}