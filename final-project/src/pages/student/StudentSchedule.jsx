import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Table } from "antd";

function StudentSchedule() {
  const { user } = useOutletContext();

  const [student, setStudent] = useState(null);
  const [teachers, setTeachers] = useState([]);
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
      <h1 className="section-title">Student Schedule</h1>

      <Table
        dataSource={schedule}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 16,
          boxShadow: "0 8px 24px rgba(0,0,0,0.05)"
        }}
        columns={[
          {
            title: "Subject",
            dataIndex: "subject",
          },
          {
            title: "Teacher",
            render: (_, record) => {
              const t = teachers.find(
                (x) => Number(x.id) === Number(record.teacherId)
              );
              return t?.name || "Unknown";
            },
          },
          {
            title: "Day",
            dataIndex: "day",
            align: "center"
          },
          {
            title: "Time",
            dataIndex: "time",
            align: "center"
          },
        ]}
      />
    </div>
  );
}

export default StudentSchedule;