import React, { useEffect, useState } from "react";

export default function ShipmentList() {
    const exporterId = localStorage.getItem("userId");
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch(
                    `http://localhost:8080/api/exporter/shipments/${exporterId}`
                );

                if (!res.ok) {
                    setList([]);
                    setLoading(false);
                    return;
                }

                const data = await res.json();
                setList(data.shipments || []); // FIX: correct for backend
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const statusBadge = (status) => {
        const base = "px-3 py-1 rounded-full text-xs font-medium";

        switch (status) {
            case "PENDING":
                return `${base} bg-yellow-100 text-yellow-700`;
            case "APPROVED":
                return `${base} bg-green-100 text-green-700`;
            case "REJECTED":
                return `${base} bg-red-100 text-red-700`;
            default:
                return `${base} bg-gray-200 text-gray-600`;
        }
    };

    const formatDate = (dt) => {
        if (!dt) return "-";
        return new Date(dt).toLocaleString();
    };

    if (loading)
        return (
            <div className="p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-300 w-40 rounded"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                </div>
            </div>
        );

    if (!list.length)
        return (
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Your Shipments</h2>
                <div className="text-gray-600">No shipments yet.</div>
            </div>
        );

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Your Shipments</h2>

            <div className="grid gap-4">
                {list.map((s) => (
                    <div
                        key={s.id}
                        className="p-5 bg-white rounded-xl shadow-sm border flex justify-between items-start hover:shadow-md transition"
                    >
                        <div>
                            <h3 className="text-lg font-semibold text-indigo-700">
                                {s.product?.name}
                            </h3>

                            <div className="text-gray-700 mt-1 text-sm">
                                Qty: <span className="font-medium">{s.quantity}</span>
                                <br />
                                Destination:{" "}
                                <span className="font-medium">{s.destinationCountry}</span>
                                <br />
                                Created:{" "}
                                <span className="text-gray-600">
                                    {formatDate(s.createdAt)}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <span className={statusBadge(s.status)}>
                                {s.status}
                            </span>

                            <button
                                className="px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700"
                                onClick={() => console.log("View details", s.id)}
                            >
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
