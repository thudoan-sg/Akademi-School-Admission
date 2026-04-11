import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://mindx-mockup-server.vercel.app/api/resources/materials?apiKey=69ca789b3bb225ca08190764";

export default function ManageMaterials() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axios.get(API).then(res => {
      setMaterials(res.data.data || []);
    });
  }, []);

  return (
    <div>
      <h2>Materials</h2>

      {materials.map((m, i) => (
        <p key={i}>{m.name}</p>
      ))}
    </div>
  );
}