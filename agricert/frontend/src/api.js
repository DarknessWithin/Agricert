const BASE = "http://localhost:8080";

export async function createBatch(formData) {
    const res = await fetch(`${BASE}/api/exporter/batches`, {
        method: "POST",
        body: formData, // multipart/form-data
    });
    if (!res.ok) throw await res.json();
    return res.json();
}

export async function listBatches(exporterId) {
    const url = exporterId ? `${BASE}/api/exporter/batches?exporterId=${exporterId}` : `${BASE}/api/exporter/batches`;
    const res = await fetch(url);
    if (!res.ok) throw await res.json();
    return res.json();
}

export async function getBatch(id) {
    const res = await fetch(`${BASE}/api/exporter/batches/${id}`);
    if (!res.ok) throw await res.json();
    return res.json();
}
