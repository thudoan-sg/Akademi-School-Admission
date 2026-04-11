import { useEffect, useState } from "react";
import axios from "axios";

const STUDENT_API = "https://mindx-mockup-server.vercel.app/api/resources/students?apiKey=69ca789b3bb225ca08190764";
const MATERIAL_API = "https://mindx-mockup-server.vercel.app/api/resources/materials?apiKey=69ca789b3bb225ca08190764";
const SCORE_API = "https://mindx-mockup-server.vercel.app/api/resources/scores?apiKey=69ca789b3bb225ca08190764";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios.get(STUDENT_API).then(res => {
      const raw = res.data.data || [];
      setStudents(raw.flatMap(obj => Object.values(obj)));
    });

    axios.get(MATERIAL_API).then(res => {
      setMaterials(res.data.data || []);
    });

    axios.get(SCORE_API).then(res => {
      const raw = res.data.data || [];
      setScores(raw.flatMap(obj => Object.values(obj)));
    });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">

      <div className="bg-white p-4 shadow rounded">
        Students: {students.length}
      </div>

      <div className="bg-white p-4 shadow rounded">
        Materials: {materials.length}
      </div>

      <div className="bg-white p-4 shadow rounded">
        Scores: {scores.length}
      </div>

    </div>
  );
}