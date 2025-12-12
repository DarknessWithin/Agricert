package com.example.agricert_QAInspection.dto;
import com.example.agricert_QAInspection.entity.InspectionStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateStatusRequest {
    private InspectionStatus status;
}
