import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, closeSidebar }) {
    return (
        <div>
            {/* Background dim when open */}
            {isOpen && (
                <div
                    onClick={closeSidebar}
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                ></div>
            )}

            {/* Sidebar panel */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-40 transform 
                ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                transition-transform duration-300`}
            >
                <div className="p-5 text-center text-xl font-bold border-b">
                    Exporter Menu
                </div>

                <nav className="p-4 space-y-4">
                    <Link className="block text-gray-700 font-medium hover:text-blue-600" to="/dashboard/exporter">
                        Dashboard Overview
                    </Link>

                    <Link className="block text-gray-700 font-medium hover:text-blue-600" to="/dashboard/exporter/submit">
                        Submit Product
                    </Link>

                    <Link className="block text-gray-700 font-medium hover:text-blue-600" to="/dashboard/exporter/status">
                        Track Status
                    </Link>

                    <Link className="block text-gray-700 font-medium hover:text-blue-600" to="/dashboard/exporter/history">
                        Certification History
                    </Link>

                    <button
                        className="block text-red-600 font-semibold mt-6"
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = "/login";
                        }}
                    >
                        Logout
                    </button>
                </nav>
            </div>
        </div>
    );
}
