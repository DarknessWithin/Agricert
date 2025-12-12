import React, { useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";

// Screens
import ImporterHome from "./Importer/ImporterHome";
import ApprovedList from "./Importer/ApprovedList";
import ShipmentDetails from "./Importer/ShipmentDetails";

export default function ImporterDashboard() {
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
                className={`bg-emerald-700 text-white w-64 p-5 absolute md:static transition-all duration-300
                    ${open ? "left-0" : "-left-64"} md:left-0 z-50`}
            >
                <h2 className="text-xl font-bold mb-6">Importer Panel</h2>

                <nav className="flex flex-col gap-4">
                    <Link to="/dashboard/importer" className={isActive("/dashboard/importer$")}>
                        Dashboard
                    </Link>

                    <Link
                        to="/dashboard/importer/approved"
                        className={isActive("/dashboard/importer/approved")}
                    >
                        Approved Shipments
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-6">
                    <button onClick={() => setOpen(!open)} className="md:hidden bg-emerald-600 text-white px-4 py-2 rounded">
                        ☰
                    </button>

                    <h1 className="text-2xl font-bold text-emerald-700">Importer Dashboard</h1>

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

                <Routes>
                    <Route path="/" element={<ImporterHome />} />
                    <Route path="approved" element={<ApprovedList />} />
                    <Route path="approved/:id" element={<ShipmentDetails />} />
                </Routes>
            </div>
        </div>
    );
}
