import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ShipmentDetails() {
    const { id } = useParams();
    const [shipment, setShipment] = useState(null);

    const load = () => {
        fetch(`http://localhost:8082/api/importer/shipments/${id}`)
            .then((res) => res.json())
            .then(setShipment)
            .catch(console.error);
    };

    useEffect(load, [id]);


    const updateStatus = (status) => {
        fetch(`http://localhost:8082/api/importer/shipments/${id}/status/${status}`, {
            method: "PATCH",
        }).then(load);
    };

    if (!shipment) return <p>Loading...</p>;

    return (
        <div className="p-4 bg-white rounded-xl shadow max-w-xl mx-auto">

            <h2 className="text-xl font-bold text-emerald-700 mb-4">
                Shipment #{shipment.shipmentId} Details
            </h2>

            <p><b>Exporter:</b> {shipment.exporterId}</p>
            <p><b>Status:</b> {shipment.importerStatus}</p>
            <p><b>Arrival Port:</b> {shipment.arrivalPort || "N/A"}</p>

            {shipment.vcToken && (
                <div className="mt-3 p-3 bg-emerald-50 border rounded">
                    <b>Verification Certificate Issued</b>
                    <p>VC Token: {shipment.vcToken}</p>
                </div>
            )}

            <hr className="my-4" />

            <h3 className="text-lg font-semibold mb-2">Update Status</h3>

            <div className="flex gap-3">
                <button
                    onClick={() => updateStatus("RECEIVED")}
                    className="bg-emerald-600 text-white px-3 py-2 rounded"
                >
                    Mark Received
                </button>

                <button
                    onClick={() => updateStatus("CLEARED")}
                    className="bg-blue-600 text-white px-3 py-2 rounded"
                >
                    Mark Cleared
                </button>

                <button
                    onClick={() => updateStatus("HOLD")}
                    className="bg-red-600 text-white px-3 py-2 rounded"
                >
                    Mark On Hold
                </button>
            </div>
        </div>
    );
}
