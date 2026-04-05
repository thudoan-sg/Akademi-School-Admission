import { Outlet } from "react-router-dom";

function StudentLayout({ user }) {
    return (
        <>
            <h2>Student Layout</h2>
            <Outlet context={{ user }} />
        </>
    );
}

export default StudentLayout;