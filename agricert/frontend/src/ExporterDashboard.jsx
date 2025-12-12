import React, { useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";

// Screens
import Products from "./Exporter/Products";
import ShipmentList from "./Exporter/ShipmentList";
import ShipmentCreatePage from "./Exporter/ShipmentCreatePage";
import QAInspectionStatus from "./Exporter/QAInspectionStatus"; // NEW IMPORT

export default function ExporterDashboard() {
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
                <h2 className="text-xl font-bold mb-6">Exporter Panel</h2>

                <nav className="flex flex-col gap-4">

                    <Link
                        to="/dashboard/exporter"
                        className={`hover:text-yellow-300 ${isActive("/dashboard/exporter$")}`}
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/dashboard/exporter/products"
                        className={`hover:text-yellow-300 ${isActive("/dashboard/exporter/products")}`}
                    >
                        Products
                    </Link>

                    <Link
                        to="/dashboard/exporter/shipments"
                        className={`hover:text-yellow-300 ${isActive("/dashboard/exporter/shipments")}`}
                    >
                        Shipments
                    </Link>

                    {/* NEW MENU ITEM */}
                    <Link
                        to="/dashboard/exporter/qa-inspections"
                        className={`hover:text-yellow-300 ${isActive("/dashboard/exporter/qa-inspections")}`}
                    >
                        QA Inspection Status
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

                    <h1 className="text-2xl font-bold text-indigo-700">Exporter Dashboard</h1>

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

                {/* Internal Routes */}
                <Routes>
                    <Route path="/" element={<ExporterHome />} />

                    <Route path="products" element={<Products />} />

                    <Route path="shipments" element={<ShipmentList />} />

                    {/* Create shipment based on a product */}
                    <Route path="shipments/create/:productId" element={<ShipmentCreatePage />} />

                    {/* 🚀 New QA Inspection Status Page */}
                    <Route path="qa-inspections" element={<QAInspectionStatus />} />
                </Routes>
            </div>
        </div>
    );
}

/* ---------------------- Dashboard Home ---------------------- */
function ExporterHome() {
    return (
        <div className="text-gray-700 text-lg">
            <h2 className="text-2xl font-semibold mb-3">Welcome Exporter 👋</h2>

            <p className="mb-2">Use the left menu to:</p>
            <ul className="list-disc ml-6 mt-2">
                <li>Manage your products</li>
                <li>Create shipments easily</li>
                <li>Track shipment status</li>
                <li>Check QA inspection results</li>
            </ul>
        </div>
    );
}
