import { useEffect, useState } from "react";
import { Table } from "antd";
import { useOutletContext } from "react-router-dom";

function StudentScores() {
  const { user } = useOutletContext();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  const API =
    "https://mindx-mockup-server.vercel.app/api/resources/scores?apiKey=69ca789b3bb225ca08190764";

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();

        // ✅ Filter theo studentId
        const filtered = data.data.data.filter(
          (item) => Number(item.studentId) === Number(user?.id)
        );

        setScores(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2 className="section-title">My Scores</h2>

      <div
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <Table
          dataSource={scores}
          rowKey="_id"
          columns={[
            { title: "Subject", dataIndex: "subject" },
            { title: "Score", dataIndex: "score" },
          ]}
          pagination={false}
        />
      </div>
    </div>
  );
}

export default StudentScores;