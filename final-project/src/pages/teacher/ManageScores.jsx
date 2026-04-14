import { useEffect, useState } from "react";
import { Table, Button, Modal, Input } from "antd";

function ManageScores() {
  const [scores, setScores] = useState([]);
  const [editing, setEditing] = useState(null);

  const API = "https://mindx-mockup-server.vercel.app/api/resources/scores?apiKey=69ca789b3bb225ca08190764";

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setScores(data.data.data);
  };

  const handleAdd = async () => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });

    const data = await res.json();
    setScores([...scores, data.data]);
    setEditing(null);
  };

  const handleUpdate = async () => {
    await fetch(`${API}/${editing._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });

    setScores(scores.map(s => s._id === editing._id ? editing : s));
    setEditing(null);
  };

  const handleDelete = async (_id) => {
    await fetch(`${API}/${_id}`, { method: "DELETE" });
    setScores(scores.filter(s => s._id !== _id));
  };

  return (
    <div style={{ padding: 24 }}>
      <h2 className="section-title">Manage Scores</h2>

      <Button
        style={{ marginBottom: 16, background: "#20c997", borderColor: "#20c997" }}
        onClick={() => setEditing({ student: "", subject: "", score: "" })}
      >
        Add Score
      </Button>

      <Table
        dataSource={scores}
        rowKey="_id"
        columns={[
          { title: "Student", dataIndex: "student" },
          { title: "Subject", dataIndex: "subject" },
          { title: "Score", dataIndex: "score" },
          {
            title: "Actions",
            render: (_, record) => (
              <>
                <Button onClick={() => setEditing(record)}>Edit</Button>
                <Button danger onClick={() => handleDelete(record._id)}>Delete</Button>
              </>
            ),
          },
        ]}
      />

      <Modal
        open={!!editing}
        onCancel={() => setEditing(null)}
        onOk={() => editing._id ? handleUpdate() : handleAdd()}
      >
        {editing && (
          <>
            <Input
              placeholder="Student"
              value={editing.student}
              onChange={(e) => setEditing({ ...editing, student: e.target.value })}
            />
            <Input
              placeholder="Subject"
              value={editing.subject}
              onChange={(e) => setEditing({ ...editing, subject: e.target.value })}
            />
            <Input
              placeholder="Score"
              value={editing.score}
              onChange={(e) => setEditing({ ...editing, score: e.target.value })}
            />
          </>
        )}
      </Modal>
    </div>
  );
}

export default ManageScores;