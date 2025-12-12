package com.example.importer_microservice.controller;
import com.example.importer_microservice.dto.ApprovedShipmentDTO;
import com.example.importer_microservice.dto.CreateImportRequest;
import com.example.importer_microservice.dto.UpdateImportStatusRequest;
import com.example.importer_microservice.model.ImportRecord;
import com.example.importer_microservice.service.ImportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/importer")
@CrossOrigin(origins = "*")
public class ImportController {

    private final ImportService service;

    public ImportController(ImportService service) {
        this.service = service;
    }

    /**
     * Endpoint for QA service to push approved shipments.
     * Body: ApprovedShipmentDTO
     */
    @PostMapping("/approved")
    public ResponseEntity<?> receiveApprovedShipment(@RequestBody ApprovedShipmentDTO dto) {
        ImportRecord saved = service.createFromApprovedShipment(dto);
        return ResponseEntity.ok(Map.of("message", "Approved shipment recorded", "record", saved));
    }

    /**
     * Called by importer UI / importer operator to acknowledge physical receipt
     */
    @PostMapping("/import")
    public ResponseEntity<?> importShipment(@RequestBody CreateImportRequest req) {
        ImportRecord saved = service.recordReceipt(req);
        return ResponseEntity.ok(Map.of("message", "Import recorded", "record", saved));
    }

    @GetMapping("/imports")
    public ResponseEntity<List<ImportRecord>> allImports() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/imports/{importerId}")
    public ResponseEntity<List<ImportRecord>> getImportsForImporter(@PathVariable Long importerId) {
        return ResponseEntity.ok(service.getImportsForImporter(importerId));
    }

    @GetMapping("/imports/record/{id}")
    public ResponseEntity<ImportRecord> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PatchMapping("/imports/status/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody UpdateImportStatusRequest request) {
        ImportRecord updated = service.updateStatus(id, request.getStatus());
        return ResponseEntity.ok(Map.of("message", "Status updated", "record", updated));
    }
}
