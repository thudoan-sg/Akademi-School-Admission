import { useEffect, useState } from "react";

function ManageTeachers() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeachers  = async () => {
            try {
                const res = await fetch(
                    "https://mindx-mockup-server.vercel.app/api/resources/users?apiKey=69ca789b3bb225ca08190764"
                );
                const data = await res.json();

                // lấy đúng mảng user
                const users = data.data.data;

                // lọc teacher
                const teacherList = users.filter(
                    (u) => u.role === "teacher"
                );

                setTeachers(teacherList);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTeachers();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Admin - Manage Teachers</h1>

            {teachers.length === 0 ? (
                <p>No teachers found</p>
            ) : (
                teachers.map((t) => (
                    <div key={t.id}>
                        <p>Username: {t.username}</p>
                        <p>Teacher ID: {t.teacherId}</p>
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default ManageTeachers;