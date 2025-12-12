package com.example.importer_microservice.dto;
import com.example.importer_microservice.model.ImportStatus;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class UpdateImportStatusRequest {
    private ImportStatus status;
}
