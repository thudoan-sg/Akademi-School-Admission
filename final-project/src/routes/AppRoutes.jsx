import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import ProtectedRoute from "../components/ProtectedRoute";

import AdminLayout from "../layouts/admin/AdminLayout";
import ManageStudents from "../pages/admin/ManageStudents";
import ManageTeachers from "../pages/admin/ManageTeachers";
import ManageSchedule from "../pages/admin/ManageSchedule";

import TeacherLayout from "../layouts/teacher/TeacherLayout";
import ManageScores from "../pages/teacher/ManageScores";
import ManageMaterials from "../pages/teacher/ManageMaterials";

import StudentLayout from "../layouts/student/StudentLayout";
import StudentProfile from "../pages/student/StudentProfile";
import StudentSchedule from "../pages/student/StudentSchedule";
import StudentScores from "../pages/student/StudentScores";
import StudentMaterials from "../pages/student/StudentMaterials";

function AppRoutes({ user, setUser }) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login setUser={setUser} />} />

                {/* ADMIN */}
                <Route path="/admin" element={
                    <ProtectedRoute user={user} allowedRoles={["admin"]}>
                        <AdminLayout />
                    </ProtectedRoute>
                }>
                    <Route index element={<h1>Admin Dashboard</h1>} />
                    <Route path="students" element={<ManageStudents />} />
                    <Route path="teachers" element={<ManageTeachers />} />
                    <Route path="schedule" element={<ManageSchedule />} />
                </Route>

                {/* TEACHER */}
                <Route path="/teacher" element={
                    <ProtectedRoute user={user} allowedRoles={["teacher"]}>
                        <TeacherLayout />
                    </ProtectedRoute>
                }>
                    <Route path="scores" element={<ManageScores />} />
                    <Route path="materials" element={<ManageMaterials />} />
                </Route>

                {/* STUDENT */}
                <Route path="/student" element={
                    <ProtectedRoute user={user} allowedRoles={["student"]}>
                        <StudentLayout user={user} />
                    </ProtectedRoute>
                }>
                    <Route path="profile" element={<StudentProfile />} />
                    <Route path="schedule" element={<StudentSchedule />} />
                    <Route path="scores" element={<StudentScores />} />
                    <Route path="materials" element={<StudentMaterials />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;