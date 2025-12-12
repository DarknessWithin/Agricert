import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Topbar({ toggleSidebar }) {
    return (
        <div className="w-full h-16 bg-white shadow-md flex items-center px-4 justify-between">
            {/* Hamburger */}
            <button onClick={toggleSidebar} className="text-2xl text-gray-700">
                <GiHamburgerMenu />
            </button>

            {/* App Name */}
            <h1 className="text-xl font-bold">AgriQCert</h1>

            {/* User Icon */}
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold">
                {localStorage.getItem("username")?.substring(0, 1).toUpperCase()}
            </div>
        </div>
    );
}
