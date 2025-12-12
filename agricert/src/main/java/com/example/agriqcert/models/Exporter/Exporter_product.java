package com.example.agriqcert.models.Exporter;

//package com.example.agriqcert.entity;

import com.example.agriqcert.models.AgriUser;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Table(name = "product")
public class Exporter_product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "exporter_id")
    private AgriUser exporter;

    private String name;
    private String description;
    private String category;
    private Integer quantity;

    private java.time.LocalDateTime createdAt = java.time.LocalDateTime.now();
}
