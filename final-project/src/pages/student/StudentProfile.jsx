import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function StudentProfile() {
    const { user } = useOutletContext();

    const [student, setStudent] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const resStudents = await fetch(
                    "https://mindx-mockup-server.vercel.app/api/resources/students?apiKey=69ca789b3bb225ca08190764"
                );
                const dataStudents = await resStudents.json();
                const students = dataStudents.data.data;

                
                const currentStudent = students.find(
                    (s) => Number(s.id) === Number(user.studentId)
                );

                setStudent(currentStudent);

            
                const resTeachers = await fetch(
                    "https://mindx-mockup-server.vercel.app/api/resources/teachers?apiKey=69ca789b3bb225ca08190764"
                );
                const dataTeachers = await resTeachers.json();
                const teachers = dataTeachers.data.data;

                
                const homeroomTeacher = teachers.find(
                    (t) => Number(t.id) === Number(currentStudent?.homeroomTeacherId)
                );

                setTeacher(homeroomTeacher);
            } catch (err) {
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Student Profile</h1>

            <p>Name: {student?.name}</p>
            <p>Class: {student?.class}</p>
            <p>Homeroom Teacher: {teacher?.name}</p>
            <p>Email: {student?.email}</p>
        </div>
    );
}

export default StudentProfile;