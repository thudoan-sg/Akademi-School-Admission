import { Outlet } from "react-router-dom";

function TeacherLayout() {
  return (
    <div>
      <h2>TEACHER NAVBAR</h2>
      <div style={{ display: "flex" }}>
        <div>TEACHER SIDEBAR</div>
        <Outlet />
      </div>
    </div>
  );
}

export default TeacherLayout;