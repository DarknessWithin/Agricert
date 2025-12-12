package com.example.agricert_QAInspection.service;
import com.example.agricert_QAInspection.dto.CreateInspectionRequest;
import com.example.agricert_QAInspection.dto.InspectionForm;
import com.example.agricert_QAInspection.entity.InspectionStatus;
import com.example.agricert_QAInspection.entity.QAInspection;
import com.example.agricert_QAInspection.repository.QAInspectionRepository;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class QAInspectionService {

    private final QAInspectionRepository repo;
    private final ObjectMapper mapper = new ObjectMapper();

    public QAInspectionService(QAInspectionRepository repo) {
        this.repo = repo;
    }

    // Create inspection request (called by exporter)
    public QAInspection createInspection(CreateInspectionRequest req) {
        // if an inspection for this shipment already exists, return it
        Optional<QAInspection> existing = repo.findByShipmentId(req.getShipmentId());
        if (existing.isPresent()) return existing.get();

        QAInspection insp = QAInspection.builder()
                .shipmentId(req.getShipmentId())
                .exporterId(req.getExporterId())
                .productId(req.getProductId())
                .productName(req.getProductName())
                .quantity(req.getQuantity())
                .destination(req.getDestination())
                .status(InspectionStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return repo.save(insp);
    }

    public List<QAInspection> getPending() {
        return repo.findByStatus(InspectionStatus.PENDING);
    }

    public List<QAInspection> getInProgress() {
        return repo.findByStatus(InspectionStatus.IN_PROGRESS);
    }

    public List<QAInspection> getCompleted() {
        return repo.findByStatus(InspectionStatus.COMPLETED);
    }

    public QAInspection startInspection(Long id) {
        QAInspection insp = repo.findById(id).orElseThrow(() -> new RuntimeException("Inspection not found"));
        insp.setStatus(InspectionStatus.IN_PROGRESS);
        insp.setUpdatedAt(LocalDateTime.now());
        return repo.save(insp);
    }

    public QAInspection submitInspection(Long id, InspectionForm form) {
        QAInspection insp = repo.findById(id).orElseThrow(() -> new RuntimeException("Inspection not found"));

        insp.setMoistureLevel(form.getMoistureLevel());
        insp.setPesticideContent(form.getPesticideContent());
        insp.setIsoCode(form.getIsoCode());
        insp.setPassed(Boolean.TRUE.equals(form.getPassed()));
        insp.setRemarks(form.getRemarks());
        insp.setStatus(InspectionStatus.COMPLETED);
        insp.setUpdatedAt(LocalDateTime.now());

        QAInspection saved = repo.save(insp);

        // Optionally auto-issue VC after completion? We'll not auto-issue; provide separate endpoint
        return saved;
    }

    public Map<String, Object> issueVC(Long id) {
        QAInspection insp = repo.findById(id).orElseThrow(() -> new RuntimeException("Inspection not found"));

        Map<String, Object> vc = new HashMap<>();
        vc.put("@context", List.of("https://www.w3.org/2018/credentials/v1"));
        vc.put("type", List.of("VerifiableCredential", "DigitalProductPassport"));
        Map<String, Object> credentialSubject = new HashMap<>();
        credentialSubject.put("shipmentId", insp.getShipmentId());
        credentialSubject.put("productId", insp.getProductId());
        credentialSubject.put("productName", insp.getProductName());
        credentialSubject.put("exporterId", insp.getExporterId());
        credentialSubject.put("moistureLevel", insp.getMoistureLevel());
        credentialSubject.put("pesticideContent", insp.getPesticideContent());
        credentialSubject.put("isoCode", insp.getIsoCode());
        credentialSubject.put("passed", insp.getPassed());
        credentialSubject.put("issuedAt", LocalDateTime.now().toString());

        vc.put("credentialSubject", credentialSubject);

        try {
            String json = mapper.writeValueAsString(vc);
            insp.setVcJson(json);
            insp.setQrCodeUrl("https://qr.example.com/inspect/" + insp.getId()); // mock qr URL
            repo.save(insp);
        } catch (Exception e) {
            throw new RuntimeException("VC generation failed: " + e.getMessage());
        }

        return vc;
    }

    public QAInspection getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Inspection not found"));
    }

    public QAInspection updateStatus(Long id, InspectionStatus status) {
        QAInspection insp = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Inspection not found"));

        insp.setStatus(status);
        insp.setUpdatedAt(LocalDateTime.now());

        return repo.save(insp);
    }

}

