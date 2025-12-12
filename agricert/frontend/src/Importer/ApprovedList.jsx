import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ApprovedList() {
    const [shipments, setShipments] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8082/api/importer/shipments")
            .then((res) => res.json())
            .then((data) => setShipments(data || []))
            .catch(console.error);
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">QA-Approved Shipments</h2>

            <div className="grid gap-4">
                {shipments.map((s) => (
                    <div
                        key={s.id}
                        className="bg-white p-5 rounded-xl shadow border hover:shadow-md transition"
                    >
                        <p className="text-emerald-700 font-semibold">
                            Shipment #{s.shipmentId}
                        </p>
                        <p>Exporter ID: {s.exporterId}</p>
                        <p>Status: <b>{s.importerStatus}</b></p>

                        <Link
                            to={`/dashboard/importer/approved/${s.id}`}
                            className="mt-2 inline-block bg-emerald-600 text-white px-3 py-1 rounded"
                        >
                            View Details →
                        </Link>
                    </div>
                ))}

                {shipments.length === 0 && (
                    <p className="text-gray-500 text-center">
                        No approved shipments yet.
                    </p>
                )}
            </div>
        </div>
    );
}
