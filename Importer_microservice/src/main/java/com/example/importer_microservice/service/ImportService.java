package com.example.importer_microservice.service;
import com.example.importer_microservice.dto.ApprovedShipmentDTO;
import com.example.importer_microservice.dto.CreateImportRequest;
import com.example.importer_microservice.model.ImportRecord;
import com.example.importer_microservice.model.ImportStatus;
import com.example.importer_microservice.repository.ImportRecordRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ImportService {

    private final ImportRecordRepository repo;

    public ImportService(ImportRecordRepository repo) {
        this.repo = repo;
    }

    /**
     * Called by QA service (push). Create or update an ImportRecord stub for a newly-approved shipment.
     * The ImportRecord will be marked READY_FOR_IMPORT.
     */
    @Transactional
    public ImportRecord createFromApprovedShipment(ApprovedShipmentDTO dto) {

        // If a record for this shipment already exists, update the approved data
        List<ImportRecord> existing = repo.findByShipmentId(dto.getShipmentId());
        ImportRecord record;
        if (!existing.isEmpty()) {
            record = existing.get(0);
            record.setProductId(dto.getProductId());
            record.setProductName(dto.getProductName());
            record.setApprovedQuantity(dto.getQuantity());
            record.setCertificateNumber(dto.getCertificateNumber());
            record.setNotes(dto.getNotes());
            record.setUpdatedAt(LocalDateTime.now());
        } else {
            record = ImportRecord.builder()
                    .shipmentId(dto.getShipmentId())
                    .importerId(null) // importer not assigned yet
                    .productId(dto.getProductId())
                    .productName(dto.getProductName())
                    .approvedQuantity(dto.getQuantity())
                    .receivedQuantity(0)
                    .warehouseLocation(null)
                    .conditionStatus(null)
                    .notes(dto.getNotes())
                    .certificateNumber(dto.getCertificateNumber())
                    .status(ImportStatus.READY_FOR_IMPORT)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();
        }

        return repo.save(record);
    }

    /**
     * Importer records physical receipt of shipment.
     */
    @Transactional
    public ImportRecord recordReceipt(CreateImportRequest request) {
        // There must be an approved import record for the shipment
        List<ImportRecord> existing = repo.findByShipmentId(request.getShipmentId());
        if (existing.isEmpty()) {
            throw new IllegalArgumentException("No approved shipment found for id: " + request.getShipmentId());
        }

        ImportRecord rec = existing.get(0);
        rec.setImporterId(request.getImporterId());
        rec.setReceivedQuantity(request.getReceivedQuantity());
        rec.setWarehouseLocation(request.getWarehouseLocation());
        rec.setConditionStatus(request.getConditionStatus());
        if (request.getNotes() != null) {
            rec.setNotes(request.getNotes());
        }
        rec.setStatus(ImportStatus.RECEIVED);
        rec.setReceivedAt(LocalDateTime.now());
        rec.setUpdatedAt(LocalDateTime.now());

        return repo.save(rec);
    }

    public List<ImportRecord> getImportsForImporter(Long importerId) {
        return repo.findByImporterId(importerId);
    }

    public List<ImportRecord> getAll() {
        return repo.findAll();
    }

    public ImportRecord getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Import record not found: " + id));
    }

    public ImportRecord updateStatus(Long id, ImportStatus status) {
        ImportRecord rec = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Import record not found: " + id));
        rec.setStatus(status);
        rec.setUpdatedAt(LocalDateTime.now());
        return repo.save(rec);
    }
}
