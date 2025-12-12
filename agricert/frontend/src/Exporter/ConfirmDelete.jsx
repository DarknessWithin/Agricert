import React from "react";
import { motion } from "framer-motion";

export default function ConfirmDelete({ name, onCancel, onConfirm, loading=false }) {
    return (
        <motion.div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center" initial={{opacity:0}} animate={{opacity:1}}>
            <motion.div className="bg-white p-6 rounded-lg w-full max-w-sm" initial={{scale:0.9}} animate={{scale:1}}>
                <h3 className="text-lg font-semibold mb-2">Delete</h3>
                <p className="text-sm text-gray-700 mb-4">Are you sure you want to delete <strong>{name}</strong>? This action cannot be undone.</p>
                <div className="flex justify-end gap-2">
                    <button onClick={onCancel} className="px-3 py-2 border rounded">Cancel</button>
                    <button onClick={onConfirm} disabled={loading} className="px-3 py-2 bg-red-600 text-white rounded">{loading ? "Deleting..." : "Delete"}</button>
                </div>
            </motion.div>
        </motion.div>
    );
}
