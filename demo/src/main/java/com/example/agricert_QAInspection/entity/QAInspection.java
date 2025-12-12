package com.example.agricert_QAInspection.entity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "qa_inspection")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QAInspection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // reference to exporter shipment (external system)
    private Long shipmentId;
    private Long exporterId;
    private Long productId;

    private String productName;
    private Integer quantity;
    private String destination;

    @Enumerated(EnumType.STRING)
    private InspectionStatus status = InspectionStatus.PENDING;

    // Inspection results
    private Double moistureLevel;
    private Double pesticideContent;
    private String isoCode;
    private Boolean passed;
    @Column(columnDefinition = "TEXT")
    private String remarks;

    // Generated proofs
    @Column(columnDefinition = "TEXT")
    private String vcJson;

    private String qrCodeUrl;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
