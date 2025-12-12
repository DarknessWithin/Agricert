import React, { useEffect, useState } from "react";

export default function QAInspectionStatus() {
    const exporterId = localStorage.getItem("userId");
    const [inspections, setInspections] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadInspections = async () => {
        try {
            const res = await fetch(
                `http://localhost:8082/api/qa/inspections/exporter/${exporterId}`
            );

            if (!res.ok) {
                setInspections([]);
                setLoading(false);
                return;
            }

            const data = await res.json();
            setInspections(data.inspections || []);

        } catch (err) {
            console.error(err);
            setInspections([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadInspections();
    }, []);

    // ---- Badges styling ----
    const badge = (status) => {
        const base = "px-3 py-1 rounded-full text-xs font-semibold";

        switch (status) {
            case "PASSED": return `${base} bg-green-100 text-green-700`;
            case "FAILED": return `${base} bg-red-100 text-red-700`;
            case "PENDING": return `${base} bg-yellow-100 text-yellow-700`;
            default: return `${base} bg-gray-200 text-gray-700`;
        }
    };

    const formatDate = (dateStr) =>
        dateStr ? new Date(dateStr).toLocaleString() : "-";

    if (loading)
        return (
            <div className="p-6 text-gray-600">
                Loading inspection data...
            </div>
        );

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                QA Inspection Status
            </h2>

            {!inspections.length && (
                <div className="text-gray-500 text-lg">
                    No inspections found yet.
                </div>
            )}

            <div className="grid gap-4 mt-4">
                {inspections.map((i) => (
                    <div
                        key={i.id}
                        className="p-5 bg-white rounded-xl shadow-sm border hover:shadow-md transition"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold text-indigo-700">
                                    Shipment #{i.shipmentId}
                                </h3>

                                <p className="text-gray-700 text-sm mt-1">
                                    Product: <span className="font-medium">{i.productName}</span> <br />
                                    Quantity: <span className="font-medium">{i.quantity}</span> <br />
                                    Date: <span className="text-gray-600">{formatDate(i.inspectionDate)}</span>
                                </p>

                                {i.notes && (
                                    <p className="text-gray-600 text-sm mt-1">
                                        Notes: {i.notes}
                                    </p>
                                )}

                                {i.certificationNumber && (
                                    <p className="text-sm text-green-700 font-medium mt-1">
                                        Certificate: {i.certificationNumber}
                                    </p>
                                )}
                            </div>

                            {/* Status badge */}
                            <span className={badge(i.status)}>{i.status}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
