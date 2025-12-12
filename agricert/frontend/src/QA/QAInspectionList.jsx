import React, { useEffect, useState } from "react";

export default function QAInspectionList() {
    const [list, setList] = useState([]);

    useEffect(() => {
        async function load() {
            const res = await fetch("http://localhost:8082/api/qa/inspections");
            const data = await res.json();
            setList(data);
        }
        load();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Pending Inspections</h2>

            {list.length === 0 ? (
                <div className="text-gray-600">No pending inspections.</div>
            ) : (
                <div className="grid gap-4">
                    {list.map((i) => (
                        <div
                            key={i.id}
                            className="p-5 bg-white rounded-xl shadow border"
                        >
                            <h3 className="text-lg font-semibold text-indigo-700">
                                Shipment #{i.shipmentId}
                            </h3>

                            <p className="text-gray-600 mt-1">
                                Exporter ID: {i.exporterId}
                            </p>

                            <p className="mt-1 text-sm text-gray-700">
                                Status: <b>{i.status}</b>
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
