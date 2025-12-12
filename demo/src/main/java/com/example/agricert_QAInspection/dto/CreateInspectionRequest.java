package com.example.agricert_QAInspection.dto;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateInspectionRequest {
    private Long shipmentId;
    private Long exporterId;
    private Long productId;
    private String productName;
    private Integer quantity;
    private String destination;
}
