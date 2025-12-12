import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShipmentCreate from "./ShipmentCreate";

export default function ShipmentCreatePage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProduct() {
            try {
                const res = await fetch(
                    `http://localhost:8080/api/exporter/products/item/${productId}`
                );
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.error(err);
                setProduct(null);
            }
            setLoading(false);
        }
        loadProduct();
    }, [productId]);

    if (loading) return <div className="p-6">Loading...</div>;
    if (!product) return <div className="p-6 text-red-600">Product not found.</div>;

    return <ShipmentCreate product={product} />;
}
