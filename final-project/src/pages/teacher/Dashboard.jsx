import { useEffect, useState } from "react";
import axios from "axios";

const STUDENT_API = "http://mindx-mockup-server.vercel.app/api/resources/students?apiKey=69d76a9f712a498cd40a2867";
const MATERIAL_API = "http://mindx-mockup-server.vercel.app/api/resources/materials?apiKey=69d76a9f712a498cd40a2867";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axios.get(STUDENT_API).then(res => {
      const raw = res.data.data;
      const result = raw.flatMap(obj => Object.values(obj));
      setStudents(result);
    });

    axios.get(MATERIAL_API).then(res => {
      setMaterials(res.data.data || []);
    });
  }, []);

  // 🔥 tính trung bình điểm
  const avgScore =
    students.length > 0
      ? (
          students.reduce((sum, s) => sum + s.math + s.english, 0) /
          (students.length * 2)
        ).toFixed(1)
      : 0;

  return (
    <div className="space-y-6">

      {/* Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-400">Students</p>
          <h2 className="text-2xl font-bold">{students.length}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-400">Materials</p>
          <h2 className="text-2xl font-bold">{materials.length}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-400">Average Score</p>
          <h2 className="text-2xl font-bold">{avgScore}</h2>
        </div>
      </div>

      {/* Recent Students */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Recent Students</h3>

        {students.slice(0, 5).map((s, i) => (
          <p key={i}>
            {s.name} - Math: {s.math} - Eng: {s.english}
          </p>
        ))}
      </div>

    </div>
  );
}