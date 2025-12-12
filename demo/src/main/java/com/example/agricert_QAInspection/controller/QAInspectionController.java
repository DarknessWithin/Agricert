package com.example.agricert_QAInspection.controller;

import com.example.agricert_QAInspection.dto.CreateInspectionRequest;
import com.example.agricert_QAInspection.dto.InspectionForm;
import com.example.agricert_QAInspection.dto.UpdateStatusRequest;
import com.example.agricert_QAInspection.entity.QAInspection;
import com.example.agricert_QAInspection.service.QAInspectionService;
import org.springframework.http.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/api/qa")
@CrossOrigin(origins = "*")
public class QAInspectionController {

    private final QAInspectionService service;

    private static final String IMPORTER_MICRO_URL =
            "http://localhost:8081/api/importer/shipments/add";

    public QAInspectionController(QAInspectionService service) {
        this.service = service;
    }

    @PostMapping("/inspections/create")
    public ResponseEntity<?> createInspection(@RequestBody CreateInspectionRequest req) {
        QAInspection created = service.createInspection(req);
        return ResponseEntity.ok(Map.of("message", "Inspection created", "inspection", created));
    }

    @GetMapping("/inspections/pending")
    public ResponseEntity<?> pending() {
        return ResponseEntity.ok(service.getPending());
    }

    @GetMapping("/inspections/in-progress")
    public ResponseEntity<?> inProgress() {
        return ResponseEntity.ok(service.getInProgress());
    }

    @GetMapping("/inspections/completed")
    public ResponseEntity<?> completed() {
        return ResponseEntity.ok(service.getCompleted());
    }

    @GetMapping("/inspections/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping("/inspections/start/{id}")
    public ResponseEntity<?> start(@PathVariable Long id) {
        QAInspection started = service.startInspection(id);
        return ResponseEntity.ok(Map.of("message", "Inspection started", "inspection", started));
    }

    @PostMapping("/inspections/submit/{id}")
    public ResponseEntity<?> submit(@PathVariable Long id, @Validated @RequestBody InspectionForm form) {
        QAInspection saved = service.submitInspection(id, form);
        return ResponseEntity.ok(Map.of("message", "Inspection submitted", "inspection", saved));
    }

    @PostMapping("/inspections/issue-vc/{id}")
    public ResponseEntity<?> issueVC(@PathVariable Long id) {
        Map<String, Object> vc = service.issueVC(id);
        return ResponseEntity.ok(Map.of("message", "VC issued", "vc", vc));
    }

    // ================================================================
    // UPDATE STATUS + NOTIFY IMPORTER SERVICE WHEN APPROVED
    // ================================================================
    @PatchMapping("/inspections/status/{id}")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestBody UpdateStatusRequest request
    ) {
        QAInspection updated = service.updateStatus(id, request.getStatus());

        // --------------------------------------------
        // 🔥 Send to IMPORTER if APPROVED
        // --------------------------------------------
        if ("APPROVED".equalsIgnoreCase(String.valueOf(request.getStatus()))) {

            Map<String, Object> payload = new HashMap<>();
            payload.put("shipmentId", updated.getShipmentId());
            payload.put("exporterId", updated.getExporterId());
            payload.put("qaInspectionId", updated.getId());

            RestTemplate rest = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);

            try {
                rest.postForEntity(IMPORTER_MICRO_URL, entity, String.class);
                System.out.println("✔ Sent approved shipment to importer microservice");
            } catch (Exception ex) {
                System.out.println("❌ Importer microservice not reachable: " + ex.getMessage());
            }
        }

        return ResponseEntity.ok(
                Map.of(
                        "message", "Status updated",
                        "inspection", updated
                )
        );
    }

}
