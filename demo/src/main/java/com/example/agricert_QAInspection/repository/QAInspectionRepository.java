package com.example.agricert_QAInspection.repository;
import com.example.agricert_QAInspection.entity.InspectionStatus;
import com.example.agricert_QAInspection.entity.QAInspection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QAInspectionRepository extends JpaRepository<QAInspection, Long> {
    List<QAInspection> findByStatus(InspectionStatus status);
    Optional<QAInspection> findByShipmentId(Long shipmentId);
}
