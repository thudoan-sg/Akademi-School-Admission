import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://mindx-mockup-server.vercel.app/api/resources/scores?apiKey=69ca789b3bb225ca08190764";

export default function ManageScores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios.get(API).then(res => {
      const raw = res.data.data || [];
      const result = raw.flatMap(obj => Object.values(obj));
      setScores(result);
    });
  }, []);

  return (
    <div>
      <h2>Scores</h2>

      {scores.map((s, i) => (
        <p key={i}>
          {s.name} - Math: {s.math} - Eng: {s.english}
        </p>
      ))}
    </div>
  );
}