package com.example.importer_microservice.repository;
import com.example.importer_microservice.model.ImportRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImportRecordRepository extends JpaRepository<ImportRecord, Long> {
    List<ImportRecord> findByImporterId(Long importerId);
    List<ImportRecord> findByShipmentId(Long shipmentId);
}

