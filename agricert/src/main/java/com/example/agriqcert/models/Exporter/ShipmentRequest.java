package com.example.agriqcert.models.Exporter;

import com.example.agriqcert.models.AgriUser;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "shipment_request")
public class ShipmentRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Prevent circular JSON
    @ManyToOne
    @JoinColumn(name = "exporter_id", nullable = false)
    @JsonIgnoreProperties({"password", "products", "shipments"})
    private AgriUser exporter;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @JsonIgnoreProperties({"exporter", "shipments"})
    private Exporter_product product;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private String destinationCountry;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ShipmentStatus status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // --------------------------
    // Auto timestamp + default status
    // --------------------------
    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();

        if (this.status == null) {
            this.status = ShipmentStatus.PENDING;
        }
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
