import React, { useState } from "react";

export default function QAUpdateStatusPage() {
    const [id, setId] = useState("");
    const [status, setStatus] = useState("APPROVED");

    const update = async () => {
        const res = await fetch(
            `http://localhost:8082/api/qa/inspections/${id}/status`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            }
        );

        if (res.ok) alert("Status updated!");
        else alert("Failed to update.");
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow max-w-lg">
            <h2 className="text-xl font-bold mb-4 text-indigo-700">
                Update Inspection Status
            </h2>

            <div className="mb-3">
                <label className="block mb-1 font-medium">Inspection ID</label>
                <input
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="w-full border p-2 rounded"
                />
            </div>

            <div className="mb-3">
                <label className="block mb-1 font-medium">New Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border p-2 rounded"
                >
                    <option>APPROVED</option>
                    <option>REJECTED</option>
                    <option>IN_PROGRESS</option>
                </select>
            </div>

            <button
                onClick={update}
                className="bg-indigo-600 text-white px-4 py-2 rounded w-full hover:bg-indigo-700"
            >
                Update
            </button>
        </div>
    );
}
