package com.example.agriqcert.repositories.Exporter;

import com.example.agriqcert.models.Exporter.ShipmentRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShipmentRepository extends JpaRepository<ShipmentRequest, Long> {
    List<ShipmentRequest> findByExporterId(Long exporterId);
}
