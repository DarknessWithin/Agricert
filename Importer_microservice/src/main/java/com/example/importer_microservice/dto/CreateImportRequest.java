package com.example.importer_microservice.dto;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CreateImportRequest {

    @NotNull
    private Long shipmentId;

    @NotNull
    private Long importerId;

    // actual received quantity (may be less than approved)
    @NotNull
    private Integer receivedQuantity;

    private String warehouseLocation;
    private String conditionStatus;
    private String notes;
}
