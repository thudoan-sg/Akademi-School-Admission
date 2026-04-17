import { useEffect, useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import { useOutletContext } from "react-router-dom";

function ManageSchedule() {
  const { user } = useOutletContext();

  const [schedule, setSchedule] = useState([]);
  const [editing, setEditing] = useState(null);

  const API =
    "https://mindx-mockup-server.vercel.app/api/resources/schedule?apiKey=69ca789b3bb225ca08190764";

  useEffect(() => {
    fetchSchedule();
  }, [user]);

  const fetchSchedule = async () => {
    const res = await fetch(API);
    const data = await res.json();


    const filtered = data.data.data.filter(
      (item) => Number(item.teacherId) === Number(user?.id)
    );

    setSchedule(filtered);
  };

  const handleAdd = async () => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editing,
        teacherId: user.id, // 🔥 tự gán teacher
      }),
    });

    const data = await res.json();
    setSchedule([...schedule, data.data]);
    setEditing(null);
  };

  const handleUpdate = async () => {
    await fetch(`${API}/${editing._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editing,
        teacherId: user.id,
      }),
    });

    setSchedule(
      schedule.map((s) => (s._id === editing._id ? editing : s))
    );
    setEditing(null);
  };

  const handleDelete = async (_id) => {
    await fetch(`${API}/${_id}`, { method: "DELETE" });
    setSchedule(schedule.filter((s) => s._id !== _id));
  };

  return (
    <div style={{ padding: 24 }}>
      <h2 className="section-title">My Schedule</h2>

      <Button
        style={{
          marginBottom: 16,
          background: "#20c997",
          borderColor: "#20c997",
        }}
        onClick={() =>
          setEditing({
            class: "",
            subject: user?.subject, // 🔥 auto theo teacher
            day: "",
            time: "",
          })
        }
      >
        Add Schedule
      </Button>

      <Table
        dataSource={schedule}
        rowKey="_id"
        columns={[
          { title: "Class", dataIndex: "class" },
          { title: "Subject", dataIndex: "subject" },
          { title: "Day", dataIndex: "day" },
          { title: "Time", dataIndex: "time" },
          {
            title: "Actions",
            render: (_, record) => (
              <>
                <Button onClick={() => setEditing(record)}>Edit</Button>
                <Button
                  danger
                  style={{ marginLeft: 8 }}
                  onClick={() => handleDelete(record._id)}
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
        title={editing?._id ? "Edit Schedule" : "Add Schedule"}
      >
        {editing && (
          <>
            <Input
              placeholder="Class"
              value={editing.class}
              onChange={(e) =>
                setEditing({ ...editing, class: e.target.value })
              }
              style={{ marginBottom: 8 }}
            />

        
            <Input value={editing.subject} disabled style={{ marginBottom: 8 }} />

            <Input
              placeholder="Day"
              value={editing.day}
              onChange={(e) =>
                setEditing({ ...editing, day: e.target.value })
              }
              style={{ marginBottom: 8 }}
            />

            <Input
              placeholder="Time"
              value={editing.time}
              onChange={(e) =>
                setEditing({ ...editing, time: e.target.value })
              }
            />
          </>
        )}
      </Modal>
    </div>
  );
}

export default ManageSchedule;