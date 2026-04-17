import { useEffect, useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import { useOutletContext } from "react-router-dom";

function ManageScores() {
  const { user } = useOutletContext();

  const [scores, setScores] = useState([]);
  const [students, setStudents] = useState([]); 
  const [editing, setEditing] = useState(null);

  const SCORE_API =
    "https://mindx-mockup-server.vercel.app/api/resources/scores?apiKey=69ca789b3bb225ca08190764";

  const STUDENT_API =
    "https://mindx-mockup-server.vercel.app/api/resources/students?apiKey=69ca789b3bb225ca08190764";

  useEffect(() => {
    fetchAll();
  }, [user]);

  const fetchAll = async () => {
    const [scoreRes, studentRes] = await Promise.all([
      fetch(SCORE_API),
      fetch(STUDENT_API),
    ]);

    const scoreData = await scoreRes.json();
    const studentData = await studentRes.json();

    const allScores = scoreData.data.data;
    const allStudents = studentData.data.data;

    setStudents(allStudents);

    
    const filtered = allScores.filter(
      (item) => item.subject === user?.subject
    );

    setScores(filtered);
  };

  const handleAdd = async () => {
    const res = await fetch(SCORE_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });

    const data = await res.json();
    setScores([...scores, data.data]);
    setEditing(null);
  };

  const handleUpdate = async () => {
    await fetch(`${SCORE_API}/${editing._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });

    setScores(scores.map((s) => (s._id === editing._id ? editing : s)));
    setEditing(null);
  };

  const handleDelete = async (_id) => {
    await fetch(`${SCORE_API}/${_id}`, { method: "DELETE" });
    setScores(scores.filter((s) => s._id !== _id));
  };

  // 🔥 helper tìm student
  const getStudentInfo = (studentId) => {
    return students.find((s) => s.id === studentId);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2 className="section-title">Manage Scores</h2>

      <Button
        style={{
          marginBottom: 16,
          background: "#20c997",
          borderColor: "#20c997",
        }}
        onClick={() =>
          setEditing({
            studentId: "",
            subject: user?.subject,
            score: "",
          })
        }
      >
        Add Score
      </Button>

      <Table
        dataSource={scores}
        rowKey="_id"
        columns={[
          {
            title: "Student Name",
            render: (_, record) => {
              const student = getStudentInfo(record.studentId);
              return student?.name || "N/A";
            },
          },
          {
            title: "Class",
            render: (_, record) => {
              const student = getStudentInfo(record.studentId);
              return student?.class || "N/A";
            },
          },
          { title: "Subject", dataIndex: "subject" },
          { title: "Score", dataIndex: "score" },
          {
            title: "Actions",
            render: (_, record) => (
              <>
                <Button onClick={() => setEditing(record)}>Edit</Button>
                <Button
                  danger
                  onClick={() => handleDelete(record._id)}
                  style={{ marginLeft: 8 }}
                >
                  Delete
                </Button>
              </>
            ),
          },
        ]}
      />

      <Modal
        open={!!editing}
        onCancel={() => setEditing(null)}
        onOk={() => (editing._id ? handleUpdate() : handleAdd())}
        title={editing?._id ? "Edit Score" : "Add Score"}
      >
        {editing && (
          <>
            {/* 🔥 nhập studentId */}
            <Input
              placeholder="Student ID (1,2,3...)"
              value={editing.studentId}
              onChange={(e) =>
                setEditing({ ...editing, studentId: Number(e.target.value) })
              }
              style={{ marginBottom: 8 }}
            />

            <Input value={editing.subject} disabled style={{ marginBottom: 8 }} />

            <Input
              placeholder="Score"
              value={editing.score}
              onChange={(e) =>
                setEditing({ ...editing, score: e.target.value })
              }
            />
          </>
        )}
      </Modal>
    </div>
  );
}

export default ManageScores;