package com.example.agriqcert.services.Exporter;

import com.example.agriqcert.models.AgriUser;
import com.example.agriqcert.models.Exporter.Exporter_product;
import com.example.agriqcert.models.Exporter.ShipmentRequest;
import com.example.agriqcert.models.Exporter.ShipmentStatus;
import com.example.agriqcert.repositories.Exporter.ProductRepository;
import com.example.agriqcert.repositories.Exporter.ShipmentRepository;
import com.example.agriqcert.repositories.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShipmentService {

    @Autowired
    private ShipmentRepository shipmentRepo;

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private UserRepo userRepo;

    // ----------------------------
    // CREATE SHIPMENT
    // ----------------------------
    public ShipmentRequest createShipment(Long exporterId, Long productId, ShipmentRequest req) {

        // Validate exporter
        AgriUser exporter = userRepo.findById(exporterId.intValue())
                .orElseThrow(() -> new RuntimeException("Exporter not found"));

        if (!String.valueOf(exporter.getRole()).equalsIgnoreCase("EXPORTER")) {
            throw new RuntimeException("User is not an exporter");
        }

        // Validate product
        Exporter_product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

//        if (!product.getExporter().getId().equals(exporterId.intValue())) {
//            throw new RuntimeException("Product does not belong to this exporter");
//        }

        // Link product + exporter
        req.setProduct(product);
        req.setExporter(exporter);

        // Default status
        req.setStatus(ShipmentStatus.valueOf("PENDING"));

        return shipmentRepo.save(req);
    }

    // ----------------------------
    // LIST SHIPMENTS OF EXPORTER
    // ----------------------------
    public List<ShipmentRequest> getExporterShipments(Long exporterId) {

        // Validate exporter exists
        userRepo.findById(exporterId.intValue())
                .orElseThrow(() -> new RuntimeException("Exporter not found"));

        return shipmentRepo.findByExporterId(exporterId);
    }
}
