import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function StudentSchedule() {
  const { user } = useOutletContext();

  const [student, setStudent] = useState(null);
  const [teachers, setTeachers] = useState([]); // FIX
  const [schedule, setSchedule] = useState([]);
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
        setTeachers(dataTeachers.data.data);

        const resSchedule = await fetch(
          "https://mindx-mockup-server.vercel.app/api/resources/schedule?apiKey=69ca789b3bb225ca08190764"
        );
        const dataSchedule = await resSchedule.json();
        const schedules = dataSchedule.data.data;

        const classSchedule = schedules.filter(
          (item) => item.class === currentStudent?.class
        );

        setSchedule(classSchedule);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Student Schedule</h1>

      {schedule.map((s) => {
        const teacher = teachers.find(
          (t) => Number(t.id) === Number(s.teacherId)
        );

        return (
          <div key={s.id}>
            <p>Subject: {s.subject}</p>
            <p>Teacher: {teacher?.name}</p>
            <p>Day: {s.day}</p>
            <p>Time: {s.time}</p>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default StudentSchedule;