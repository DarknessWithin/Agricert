import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ShipmentCreate({ product }) {
    const navigate = useNavigate();
    const exporterId = localStorage.getItem("userId");

    const [quantity, setQuantity] = useState("");
    const [destination, setDestination] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const res = await fetch(
                `http://localhost:8080/api/exporter/shipments/create/${exporterId}/${product.id}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        quantity: Number(quantity),
                        destinationCountry: destination,
                    }),
                }
            );

            if (!res.ok) throw new Error();

            toast.success("Shipment request created!");
            navigate("/dashboard/exporter/shipments");
        } catch (err) {
            toast.error("Failed to create shipment");
        }
        setLoading(false);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-bold mb-2">
                Create Shipment for <span className="text-indigo-600">{product.name}</span>
            </h2>

            <form onSubmit={submit} className="space-y-4 mt-4">
                <div>
                    <label className="font-medium">Quantity</label>
                    <input
                        type="number"
                        className="w-full border p-2 rounded mt-1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="font-medium">Destination Country</label>
                    <input
                        className="w-full border p-2 rounded mt-1"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required
                    />
                </div>

                <button
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Shipment"}
                </button>
            </form>
        </div>
    );
}
