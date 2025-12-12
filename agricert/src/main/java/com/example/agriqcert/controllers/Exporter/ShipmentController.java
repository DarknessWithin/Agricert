package com.example.agriqcert.controllers.Exporter;

import com.example.agriqcert.models.Exporter.ShipmentRequest;
import com.example.agriqcert.services.Exporter.ShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/api/exporter/shipments")
@CrossOrigin(origins = "http://localhost:5173")
public class ShipmentController {

    @Autowired
    private ShipmentService shipmentService;

    private final String QA_MICROSERVICE_URL = "http://localhost:8090/api/qa/inspections/create";

    // ----------------------------
    // CREATE SHIPMENT
    // ----------------------------
    @PostMapping("/create/{exporterId}/{productId}")
    public ResponseEntity<?> createShipment(
            @PathVariable Long exporterId,
            @PathVariable Long productId,
            @RequestBody ShipmentRequest shipmentRequest) {

        try {
            // 1. SAVE SHIPMENT IN EXPORTER DB
            ShipmentRequest saved = shipmentService.createShipment(exporterId, productId, shipmentRequest);

            // 2. SEND REQUEST TO QA SERVICE
            RestTemplate restTemplate = new RestTemplate();

            Map<String, Object> qaPayload = new HashMap<>();
            qaPayload.put("shipmentId", saved.getId());
            qaPayload.put("exporterId", exporterId);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(qaPayload, headers);

            try {
                restTemplate.postForEntity(QA_MICROSERVICE_URL, entity, String.class);
            } catch (Exception e) {
                System.out.println("⚠ QA Microservice Unavailable: " + e.getMessage());
            }

            // 3. RESPONSE TO EXPORTER UI
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Shipment created successfully and QA request sent");
            response.put("shipment", saved);

            return ResponseEntity.ok(response);

        } catch (Exception ex) {
            Map<String, Object> error = new HashMap<>();
            error.put("message", "Failed to create shipment");
            error.put("error", ex.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    // ----------------------------
    // GET SHIPMENTS BY EXPORTER
    // ----------------------------
    @GetMapping("/{exporterId}")
    public ResponseEntity<?> getExporterShipments(@PathVariable Long exporterId) {

        try {
            List<ShipmentRequest> shipments = shipmentService.getExporterShipments(exporterId);

            Map<String, Object> response = new HashMap<>();
            response.put("count", shipments.size());
            response.put("shipments", shipments);

            return ResponseEntity.ok(response);

        } catch (Exception ex) {
            Map<String, Object> error = new HashMap<>();
            error.put("message", "Failed to fetch shipments");
            error.put("error", ex.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
}
