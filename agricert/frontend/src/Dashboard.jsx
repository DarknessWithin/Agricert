import React from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 h-screen bg-white shadow-xl p-6 hidden md:flex flex-col sticky top-0">
                <h1 className="text-2xl font-bold text-indigo-700 mb-8 tracking-tight">AgriQCert</h1>
                <nav className="flex flex-col gap-5 text-gray-700 font-medium">
                    <button className="text-left px-3 py-2 rounded-xl hover:bg-indigo-100 hover:text-indigo-700 transition">
                        Dashboard
                    </button>
                    <button className="text-left px-3 py-2 rounded-xl hover:bg-indigo-100 hover:text-indigo-700 transition">
                        Batches
                    </button>
                    <button className="text-left px-3 py-2 rounded-xl hover:bg-indigo-100 hover:text-indigo-700 transition">
                        Inspections
                    </button>
                    <button className="text-left px-3 py-2 rounded-xl hover:bg-indigo-100 hover:text-indigo-700 transition">
                        Verification
                    </button>
                </nav>
            </aside>

            {/* Main area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
                    <h2 className="text-xl font-semibold text-gray-800">Dashboard Overview</h2>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-xl shadow hover:bg-indigo-700 transition">
                            Profile
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white font-medium rounded-xl shadow hover:bg-red-700 transition">
                            Logout
                        </button>
                    </div>
                </header>

                {/* Cards */}
                <main className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Total Batches */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-3xl shadow hover:shadow-lg transition cursor-pointer border border-indigo-200"
                    >
                        <h3 className="text-indigo-800 text-lg font-semibold mb-2">Total Batches</h3>
                        <p className="text-5xl font-extrabold text-indigo-900">12</p>
                    </motion.div>

                    {/* Pending Inspections */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-3xl shadow hover:shadow-lg transition cursor-pointer border border-yellow-200"
                    >
                        <h3 className="text-yellow-800 text-lg font-semibold mb-2">Pending Inspections</h3>
                        <p className="text-5xl font-extrabold text-yellow-900">4</p>
                    </motion.div>

                    {/* VC Issued */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                        className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-3xl shadow hover:shadow-lg transition cursor-pointer border border-green-200"
                    >
                        <h3 className="text-green-800 text-lg font-semibold mb-2">VC Issued</h3>
                        <p className="text-5xl font-extrabold text-green-900">7</p>
                    </motion.div>
                </main>

                {/* Footer */}
                <footer className="text-center py-4 text-gray-500 border-t mt-auto">
                    © {new Date().getFullYear()} AgriQCert — Quality Verification Portal
                </footer>
            </div>
        </div>
    );
}