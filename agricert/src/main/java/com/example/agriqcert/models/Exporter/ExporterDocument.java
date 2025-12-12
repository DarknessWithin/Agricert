package com.example.agriqcert.models.Exporter;

import com.example.agriqcert.models.AgriUser;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Table(name = "exporter_documents")
public class ExporterDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "exporter_id")
    private AgriUser exporter;

    @ManyToOne
    @JoinColumn(name = "shipment_id")
    private ShipmentRequest shipment;

    private String fileName;
    private String fileType;
    private String fileUrl;

    private java.time.LocalDateTime uploadedAt = java.time.LocalDateTime.now();
}
