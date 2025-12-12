import React, { useState } from "react";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

export default function AddProduct({ onClose, reload }) {
    const exporterId = localStorage.getItem("userId");

    const [product, setProduct] = useState({
        name: "",
        category: "",
        description: "",
        quantity: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {console.log("Submitting product:", product);

            const res = await fetch(
                `http://localhost:8080/api/exporter/products/add/${exporterId}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(product),
                }
            );

            if (!res.ok) {
                toast.error("❌ Failed to add product");
                return;
            }
            console.log("Response:", res.status);
            toast.success("✅ Product added successfully!");
            reload();
            onClose();
        } catch (err) {
            toast.error("⚠️ Something went wrong");
            console.log(err);
        } finally {
            setLoading(false); // ALWAYS restore button
        }
    };



    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.div
                className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg relative"
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
            >
                {/* Close icon */}
                <button onClick={onClose} className="absolute top-5 right-5">
                    <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-black" />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    Add New Product
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Product Name"
                        name="name"
                        required
                        className="w-full p-3 border rounded-xl"
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        placeholder="Category"
                        name="category"
                        required
                        className="w-full p-3 border rounded-xl"
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        placeholder="Quantity"
                        name="quantity"
                        required
                        className="w-full p-3 border rounded-xl"
                        onChange={handleChange}
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        rows="3"
                        className="w-full p-3 border rounded-xl"
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition ${
                            loading && "opacity-50 cursor-not-allowed"
                        }`}
                    >
                        {loading ? "Adding..." : "Add Product"}
                    </button>

                </form>
            </motion.div>
        </motion.div>
    );
}
