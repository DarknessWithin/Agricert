import React, { useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import QAInspectionList from "./QA/QAInspectionList";
import QAUpdateStatusPage from "./QA/QAUpdateStatusPage";

export default function QADashboard() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) =>
        location.pathname.startsWith(path)
            ? "text-yellow-300 font-semibold"
            : "text-white";

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <div
                className={`bg-indigo-700 text-white w-64 p-5 absolute md:static transition-all duration-300
                ${open ? "left-0" : "-left-64"} md:left-0 z-50`}
            >
                <h2 className="text-xl font-bold mb-6">QA Panel</h2>

                <nav className="flex flex-col gap-4">

                    <Link
                        to="/dashboard/qa"
                        className={`hover:text-yellow-300 ${isActive("/dashboard/qa$")}`}
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/dashboard/qa/inspections"
                        className={`hover:text-yellow-300 ${isActive("/dashboard/qa/inspections")}`}
                    >
                        Pending Inspections
                    </Link>

                    <Link
                        to="/dashboard/qa/update-status"
                        className={`hover:text-yellow-300 ${isActive("/dashboard/qa/update-status")}`}
                    >
                        Update Status
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">

                {/* Top Navbar */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden bg-indigo-600 text-white px-4 py-2 rounded"
                    >
                        ☰
                    </button>

                    <h1 className="text-2xl font-bold text-indigo-700">QA Dashboard</h1>

                    <button
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = "/login";
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>

                {/* Routes */}
                <Routes>
                    <Route path="/" element={<QADashboardHome />} />
                    <Route path="inspections" element={<QAInspectionList />} />
                    <Route path="update-status" element={<QAUpdateStatusPage />} />
                </Routes>

            </div>
        </div>
    );
}

/* ---------------- Dashboard Home ---------------- */
function QADashboardHome() {
    return (
        <div className="text-gray-700 text-lg">
            <h2 className="text-2xl font-semibold mb-3">Welcome QA Inspector 👷‍♂️</h2>

            <p>Use the left menu to:</p>

            <ul className="list-disc ml-6 mt-2">
                <li>View pending inspections</li>
                <li>Update shipment inspection status</li>
                <li>Review approved/rejected shipments</li>
            </ul>
        </div>
    );
}
