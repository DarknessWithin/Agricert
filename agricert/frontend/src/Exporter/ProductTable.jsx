import React from "react";
import { Link } from "react-router-dom";
import EditProduct from "./EditProduct";
import ConfirmDelete from "./ConfirmDelete";
import { toast } from "react-toastify";

export default function ProductTable({ products, reload }) {
    const [editing, setEditing] = React.useState(null);
    const [deleting, setDeleting] = React.useState(null);

    const deleteProduct = async () => {
        try {
            await fetch(
                `http://localhost:8080/api/exporter/products/${deleting.id}`,
                { method: "DELETE" }
            );
            toast.success("Product deleted");
            setDeleting(null);
            reload();
        } catch (err) {
            toast.error("Failed to delete");
        }
    };

    return (
        <div className="overflow-x-auto rounded-xl shadow bg-white">
            <table className="min-w-full text-left text-gray-700">
                <thead className="bg-indigo-100">
                <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Qty</th>
                    <th className="p-4">Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((p) => (
                    <tr key={p.id} className="border-b hover:bg-indigo-50">
                        <td className="p-4 font-semibold">{p.name}</td>
                        <td className="p-4">{p.category}</td>
                        <td className="p-4">{p.quantity}</td>

                        <td className="p-4 flex gap-3">
                            <Link
                                to={`/dashboard/exporter/shipments/create/${p.id}`}
                                className="text-indigo-600 font-medium"
                            >
                                Create Shipment
                            </Link>

                            <button
                                className="text-blue-600"
                                onClick={() => setEditing(p)}
                            >
                                Edit
                            </button>
                            <button
                                className="text-red-600"
                                onClick={() => setDeleting(p)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}

                {products.length === 0 && (
                    <tr>
                        <td
                            colSpan="4"
                            className="text-center py-8 text-gray-500"
                        >
                            No products added yet.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {editing && (
                <EditProduct
                    product={editing}
                    onClose={() => setEditing(null)}
                    reload={reload}
                />
            )}

            {deleting && (
                <ConfirmDelete
                    name={deleting.name}
                    onCancel={() => setDeleting(null)}
                    onConfirm={deleteProduct}
                />
            )}
        </div>
    );
}
