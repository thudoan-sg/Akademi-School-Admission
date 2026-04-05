import { useOutletContext } from "react-router-dom";

function StudentProfile() {
    const { user } = useOutletContext();
    if (!user) {
        return <p>No user data</p>;
    }

    return (
        <div>
            <h1>Student Profile</h1>
            <p>Username: {user.username}</p>
            <p>Role: {user.role}</p>
            <p>Student ID: {user.studentId}</p>
        </div>
    );
}

export default StudentProfile;