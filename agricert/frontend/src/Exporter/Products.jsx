import React, { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import AddProduct from "./AddProduct";
import ProductTable from "./ProductTable";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const exporterId = localStorage.getItem("userId");

    const loadProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `http://localhost:8080/api/exporter/products/${exporterId}`
            );

            const data = await res.json();
            setProducts(data.products || []);
        } catch (err) {
            console.error(err);
            setProducts([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Your Products</h1>

                <button
                    className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
                    onClick={() => setShowAddModal(true)}
                >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Add Product
                </button>
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-500 text-lg">
                    Loading products...
                </div>
            ) : (
                <ProductTable products={products} reload={loadProducts} />
            )}

            {showAddModal && (
                <AddProduct
                    onClose={() => setShowAddModal(false)}
                    reload={loadProducts}
                />
            )}
        </div>
    );
}
