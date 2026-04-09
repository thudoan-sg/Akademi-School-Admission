import { useEffect, useState } from "react";

function ManageSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({
    class: "",
    subject: "",
    teacherId: "",
    day: "",
    time: ""
  });
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
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newItem)
      });

      const data = await res.json();

      setSchedule([...schedule, data.data]);
    } catch (err) {
      console.error(err);
    }
  };


  const handleDelete = async (_id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this schedule?")) return;
      await fetch(
        `https://mindx-mockup-server.vercel.app/api/resources/schedule/${_id}?apiKey=69ca789b3bb225ca08190764`,
        {
          method: "DELETE"
        }
      );

      setSchedule(schedule.filter((item) => item._id !== _id));
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
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editingItem)
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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Manage Schedule</h1>

      {schedule.map((s) => (
        <div key={s._id}>
          <p>Class: {s.class}</p>
          <p>Subject: {s.subject}</p>
          <p>Teacher ID: {s.teacherId}</p>
          <p>Day: {s.day}</p>
          <p>Time: {s.time}</p>


          <button onClick={() => handleDelete(s._id)}>Delete</button>
          <button onClick={() => setEditingItem(s)}>Edit</button>

          <hr />
        </div>
      ))}

      <input
        placeholder="Class"
        onChange={(e) => setNewItem({ ...newItem, class: e.target.value })}
      />

      <input
        placeholder="Subject"
        onChange={(e) => setNewItem({ ...newItem, subject: e.target.value })}
      />

      <input
        placeholder="Teacher ID"
        onChange={(e) => setNewItem({ ...newItem, teacherId: e.target.value })}
      />

      <input
        placeholder="Day"
        onChange={(e) => setNewItem({ ...newItem, day: e.target.value })}
      />

      <input
        placeholder="Time"
        onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
      />

      <button onClick={handleAdd}>Add</button>
      {editingItem && (
        <div>
          <h3>Edit Schedule</h3>

          <input
            value={editingItem.class}
            onChange={(e) =>
              setEditingItem({ ...editingItem, class: e.target.value })
            }
          />

          <input
            value={editingItem.subject}
            onChange={(e) =>
              setEditingItem({ ...editingItem, subject: e.target.value })
            }
          />

          <input
            value={editingItem.teacherId}
            onChange={(e) =>
              setEditingItem({ ...editingItem, teacherId: e.target.value })
            }
          />

          <input
            value={editingItem.day}
            onChange={(e) =>
              setEditingItem({ ...editingItem, day: e.target.value })
            }
          />

          <input
            value={editingItem.time}
            onChange={(e) =>
              setEditingItem({ ...editingItem, time: e.target.value })
            }
          />

          <button onClick={handleUpdate}>Save</button>
        </div>
      )}
    </div>
  );
}

export default ManageSchedule;