import { useEffect, useState } from "react";
import axios from "axios";

const STUDENT_API = "https://mindx-mockup-server.vercel.app/api/resources/students?apiKey=69ca789b3bb225ca08190764";
const MATERIAL_API = "https://mindx-mockup-server.vercel.app/api/resources/materials?apiKey=69ca789b3bb225ca08190764";
const SCORE_API = "https://mindx-mockup-server.vercel.app/api/resources/scores?apiKey=69ca789b3bb225ca08190764";

/** API trả { data: { data: [...] } } — giống ManageStudents / ManageTeachers */
function listFromResourceResponse(res) {
  const rows = res?.data?.data?.data;
  return Array.isArray(rows) ? rows : [];
}

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios.get(STUDENT_API).then((res) => {
      setStudents(listFromResourceResponse(res));
    });

    axios.get(MATERIAL_API).then((res) => {
      setMaterials(listFromResourceResponse(res));
    });

    axios.get(SCORE_API).then((res) => {
      setScores(listFromResourceResponse(res));
    });
  }, []);

  const card = {
    flex: 1,
    minWidth: 160,
    padding: 20,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
        maxWidth: 900,
      }}
    >
      <div style={card}>Students: {students.length}</div>
      <div style={card}>Materials: {materials.length}</div>
      <div style={card}>Scores: {scores.length}</div>
    </div>
  );
}