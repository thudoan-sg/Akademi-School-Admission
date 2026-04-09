import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://mindx-mockup-server.vercel.app/api/resources/materials?apiKey=69d76a9f712a498cd40a2867";

export default function ManageMaterials() {
  const [files, setFiles] = useState([]);
  const [newFile, setNewFile] = useState("");

  const fetchData = () => {
    axios.get(API).then((res) => {
      setFiles(res.data.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    axios.post(API, { name: newFile }).then(() => {
      fetchData();
      setNewFile("");
    });
  };

  const handleDelete = (id) => {
    axios.delete(`${API}/${id}`).then(fetchData);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="font-semibold">Materials</h2>

      <div className="flex gap-2">
        <input
          placeholder="File name"
          value={newFile}
          onChange={(e) => setNewFile(e.target.value)}
          className="border p-1"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-3">
          Add
        </button>
      </div>

      <ul>
        {files.map((f) => (
          <li key={f.id} className="flex justify-between border-b py-2">
            {f.name}
            <button
              onClick={() => handleDelete(f.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}