import { useEffect, useState } from "react";
import { Table, Button, Modal, Input } from "antd";

function ManageSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);

  const API =
    "https://mindx-mockup-server.vercel.app/api/resources/schedule?apiKey=69ca789b3bb225ca08190764";

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setSchedule(data.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingItem),
      });

      const data = await res.json();

      setSchedule([...schedule, data.data]);
      setEditingItem(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await fetch(
        `https://mindx-mockup-server.vercel.app/api/resources/schedule/${editingItem._id}?apiKey=69ca789b3bb225ca08190764`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingItem),
        }
      );

      const updatedList = schedule.map((item) =>
        item._id === editingItem._id ? editingItem : item
      );

      setSchedule(updatedList);
      setEditingItem(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (_id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this schedule?"))
        return;

      await fetch(
        `https://mindx-mockup-server.vercel.app/api/resources/schedule/${_id}?apiKey=69ca789b3bb225ca08190764`,
        {
          method: "DELETE",
        }
      );

      setSchedule(schedule.filter((item) => item._id !== _id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ marginBottom: 16 }}>Manage Schedule</h2>

        <Button
          type="primary"
          style={{
            marginBottom: 16,
            backgroundColor: "#20c997", 
            borderColor: "#20c997",
          }}
          onClick={() =>
            setEditingItem({
              class: "",
              subject: "",
              teacherId: "",
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
            { title: "Teacher ID", dataIndex: "teacherId" },
            { title: "Day", dataIndex: "day" },
            { title: "Time", dataIndex: "time" },
            {
              title: "Actions",
              render: (_, record) => (
                <>
                  <Button onClick={() => setEditingItem(record)}>Edit</Button>
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
          open={!!editingItem}
          onCancel={() => setEditingItem(null)}
          onOk={() => {
            if (editingItem._id) {
              handleUpdate();
            } else {
              handleAdd();
            }
          }}
          title={editingItem?._id ? "Edit Schedule" : "Add Schedule"}
        >
          {editingItem && (
            <>
              <Input
                placeholder="Class"
                value={editingItem.class || ""}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, class: e.target.value })
                }
                style={{ marginBottom: 8 }}
              />

              <Input
                placeholder="Subject"
                value={editingItem.subject || ""}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, subject: e.target.value })
                }
                style={{ marginBottom: 8 }}
              />

              <Input
                placeholder="Teacher ID"
                value={editingItem.teacherId || ""}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    teacherId: e.target.value,
                  })
                }
                style={{ marginBottom: 8 }}
              />

              <Input
                placeholder="Day"
                value={editingItem.day || ""}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, day: e.target.value })
                }
                style={{ marginBottom: 8 }}
              />

              <Input
                placeholder="Time"
                value={editingItem.time || ""}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, time: e.target.value })
                }
              />
            </>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default ManageSchedule;