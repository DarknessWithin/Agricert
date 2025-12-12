package com.example.agriqcert.repositories.Exporter;


import com.example.agriqcert.models.Exporter.Exporter_product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Exporter_product,Long> {
    List<Exporter_product> findByExporterId(Long exporterId);
//    void deleteByExporterId(Long exporterId);
}
