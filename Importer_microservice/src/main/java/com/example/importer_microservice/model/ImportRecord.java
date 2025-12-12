package com.example.importer_microservice.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "import_records")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImportRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // External shipment reference (QA/Exporter)
    private Long shipmentId;

    private Long importerId;

    private Long productId;
    private String productName;

    private Integer approvedQuantity;    // quantity certified by QA
    private Integer receivedQuantity;    // actual received by importer

    private String warehouseLocation;
    private String conditionStatus;      // GOOD / DAMAGED / PARTIAL
    private String notes;

    private String certificateNumber;    // optional QA certificate reference

    @Enumerated(EnumType.STRING)
    private ImportStatus status = ImportStatus.READY_FOR_IMPORT;

    private LocalDateTime receivedAt;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
}
