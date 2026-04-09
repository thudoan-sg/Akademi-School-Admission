import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://mindx-mockup-server.vercel.app/api/resources/students?apiKey=69d76a9f712a498cd40a2867";

export default function ManageScores() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    math: "",
    english: "",
  });

  // 🔥 GET
  const fetchData = () => {
    axios.get(API).then((res) => {
      setStudents(res.data.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ➕ ADD
  const handleAdd = () => {
    axios.post(API, newStudent).then(() => {
      fetchData();
      setNewStudent({ name: "", math: "", english: "" });
    });
  };

  // ✏️ UPDATE
  const handleUpdate = (id, field, value) => {
    const student = students.find((s) => s.id === id);
    const updated = { ...student, [field]: value };

    axios.put(`${API}/${id}`, updated).then(() => {
      fetchData();
    });
  };

  // ❌ DELETE
  const handleDelete = (id) => {
    axios.delete(`${API}/${id}`).then(() => {
      fetchData();
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="font-semibold">Score Management</h2>

      {/* ADD */}
      <div className="flex gap-2">
        <input
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) =>
            setNewStudent({ ...newStudent, name: e.target.value })
          }
          className="border p-1"
        />

        <input
          placeholder="Math"
          value={newStudent.math}
          onChange={(e) =>
            setNewStudent({ ...newStudent, math: e.target.value })
          }
          className="border p-1"
        />

        <input
          placeholder="English"
          value={newStudent.english}
          onChange={(e) =>
            setNewStudent({ ...newStudent, english: e.target.value })
          }
          className="border p-1"
        />

        <button onClick={handleAdd} className="bg-blue-500 text-white px-3">
          Add
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400">
            <th>Name</th>
            <th>Math</th>
            <th>English</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="border-t">
              <td>{s.name}</td>

              <td>
                <input
                  value={s.math}
                  onChange={(e) =>
                    handleUpdate(s.id, "math", e.target.value)
                  }
                  className="border w-12"
                />
              </td>

              <td>
                <input
                  value={s.english}
                  onChange={(e) =>
                    handleUpdate(s.id, "english", e.target.value)
                  }
                  className="border w-12"
                />
              </td>

              <td>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}