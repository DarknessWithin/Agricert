import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Signup from "./Signup";
import Login from "./Login";
import ExporterDashboard from "./ExporterDashboard";
import QADashboard from "./QADashboard";
import ImporterDashboard from "./ImporterDashboard";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* EXPORTER */}
            <Route
                path="/dashboard/exporter/*"
                element={
                    <ProtectedRoute allowedRoles={["EXPORTER"]}>
                        <ExporterDashboard />
                    </ProtectedRoute>
                }
            />

            {/* QA */}
            <Route
                path="/dashboard/qa/*"
                element={
                    <ProtectedRoute allowedRoles={["QA"]}>
                        <QADashboard />
                    </ProtectedRoute>
                }
            />

            {/* IMPORTER */}
            <Route
                path="/dashboard/importer/*"
                element={
                    <ProtectedRoute allowedRoles={["IMPORTER"]}>
                        <ImporterDashboard />
                    </ProtectedRoute>
                }
            />

            {/* Generic */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}
