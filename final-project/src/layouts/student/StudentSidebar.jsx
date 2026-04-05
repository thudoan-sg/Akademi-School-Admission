export default function StudentSidebar() {
  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h1 className="text-xl font-bold mb-6">Student</h1>

      <ul className="space-y-4 text-gray-600">
        <li className="text-blue-500 font-semibold">Profile</li>
        <li>Scores</li>
        <li>Schedule</li>
      </ul>
    </div>
  );
}