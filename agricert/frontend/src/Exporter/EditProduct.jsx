import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

export default function EditProduct({ product, onClose, reload }) {
    const [form, setForm] = useState({
        name: "",
        category: "",
        description: "",
        quantity: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (product) {
            setForm({
                name: product.name || "",
                category: product.category || "",
                description: product.description || "",
                quantity: product.quantity || "",
            });
        }
    }, [product]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8080/api/exporter/products/${product.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                const err = await res.json().catch(()=>({message:'Update failed'}));
                toast.error(err.message || "Failed to update");
                setLoading(false);
                return;
            }
            toast.success("Product updated");
            reload();
            onClose();
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
        setLoading(false);
    };

    return (
        <motion.div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center" initial={{opacity:0}} animate={{opacity:1}}>
            <motion.div className="bg-white p-6 rounded-xl w-full max-w-lg relative" initial={{scale:0.9}} animate={{scale:1}}>
                <button onClick={onClose} className="absolute top-4 right-4"><XMarkIcon className="w-6 h-6"/></button>
                <h3 className="text-xl font-semibold mb-4">Edit Product</h3>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input name="name" value={form.name} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Name" />
                    <input name="category" value={form.category} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Category" />
                    <input name="quantity" type="number" value={form.quantity} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Quantity" />
                    <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Description" />
                    <div className="flex gap-2">
                        <button disabled={loading} type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">{loading ? "Saving..." : "Save"}</button>
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}
