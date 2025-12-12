package com.example.importer_microservice.dto;
import lombok.*;
import java.time.LocalDateTime;
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ApprovedShipmentDTO {
    private Long shipmentId;
    private Long exporterId;
    private Long productId;
    private String productName;
    private Integer quantity;               // approved quantity by QA
    private String destination;
    private String certificateNumber;       // optional
    private LocalDateTime inspectionDate;   // optional
    private String notes;
}
