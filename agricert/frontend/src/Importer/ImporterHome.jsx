import React from "react";

export default function ImporterHome() {
    return (
        <div className="text-gray-700 text-lg">
            <h2 className="text-2xl font-semibold mb-3">Welcome Importer 👋</h2>

            <p className="mb-2">Use the left menu to:</p>
            <ul className="list-disc ml-6 mt-2">
                <li>View QA-approved shipments</li>
                <li>Mark shipments as received</li>
                <li>Track verification certificate (VC)</li>
            </ul>
        </div>
    );
}
