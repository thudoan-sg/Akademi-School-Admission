import { useEffect, useState } from "react";

function ManageStudents() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await fetch(
                    "https://mindx-mockup-server.vercel.app/api/resources/users?apiKey=69ca789b3bb225ca08190764"
                );
                const data = await res.json();

                // lấy đúng mảng user
                const users = data.data.data;

                // lọc student
                const studentList = users.filter(
                    (u) => u.role === "student"
                );

                setStudents(studentList);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Admin - Manage Students</h1>

            {students.length === 0 ? (
                <p>No students found</p>
            ) : (
                students.map((s) => (
                    <div key={s.id}>
                        <p>Username: {s.username}</p>
                        <p>Student ID: {s.studentId}</p>
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default ManageStudents;