package com.example.agricert_QAInspection.dto;


import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InspectionForm {

    @NotNull
    private Double moistureLevel;

    @NotNull
    private Double pesticideContent;

    private String isoCode;
    private Boolean passed;
    private String remarks;
}
