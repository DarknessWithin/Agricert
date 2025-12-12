package com.example.agriqcert.services.Exporter;

import com.example.agriqcert.models.AgriUser;
import com.example.agriqcert.models.Exporter.Exporter_product;
import com.example.agriqcert.repositories.Exporter.ProductRepository;
import com.example.agriqcert.repositories.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repo;

    @Autowired
    private UserRepo userRepo;

    // --------------------------------------------------------
    // ADD PRODUCT
    // --------------------------------------------------------
    public Exporter_product addProduct(Long exporterId, Exporter_product p) {

        AgriUser exporter = userRepo.findById(exporterId.intValue())
                .orElseThrow(() -> new RuntimeException("Exporter not found: " + exporterId));

        // Ensure correct role
        if (!"EXPORTER".equalsIgnoreCase(String.valueOf(exporter.getRole()))) {
            throw new RuntimeException("User " + exporterId + " is not an exporter");
        }

        p.setExporter(exporter);
        return repo.save(p);
    }

    // --------------------------------------------------------
    // GET ALL PRODUCTS OF EXPORTER
    // --------------------------------------------------------
    public List<Exporter_product> getExporterProducts(Long exporterId) {

        AgriUser exporter = userRepo.findById(exporterId.intValue())
                .orElseThrow(() -> new RuntimeException("Exporter not found: " + exporterId));

        if (!"EXPORTER".equalsIgnoreCase(String.valueOf(exporter.getRole()))) {
            throw new RuntimeException("User " + exporterId + " is not an exporter");
        }

        return repo.findByExporterId(exporterId);
    }
    public Exporter_product getProductById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

}
