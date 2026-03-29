import { Outlet } from "react-router-dom";

function StudentLayout() {
  return (
    <div>
      <h2>STUDENT NAVBAR</h2>
      <div style={{ display: "flex" }}>
        <div>STUDENT SIDEBAR</div>
        <Outlet />
      </div>
    </div>
  );
}

export default StudentLayout;