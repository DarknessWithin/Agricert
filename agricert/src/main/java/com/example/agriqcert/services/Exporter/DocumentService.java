package com.example.agriqcert.services.Exporter;

import com.example.agriqcert.models.AgriUser;
import com.example.agriqcert.models.Exporter.ExporterDocument;
import com.example.agriqcert.models.Exporter.ShipmentRequest;
import com.example.agriqcert.repositories.Exporter.ExporterDocumentRepository;
import com.example.agriqcert.repositories.Exporter.ShipmentRepository;
import com.example.agriqcert.repositories.Exporter.ShipmentRepository;
import com.example.agriqcert.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class DocumentService {

    @Autowired
    ExporterDocumentRepository repo;

    @Autowired
    ShipmentRepository shipmentRepo;

    @Autowired
    UserRepo userRepo;

    public ExporterDocument uploadDocument(Long exporterId, Long shipmentId, MultipartFile file) throws Exception {
        AgriUser exporter = userRepo.findById(Math.toIntExact(exporterId)).orElseThrow();
        ShipmentRequest shipment = shipmentRepo.findById(shipmentId).orElseThrow();

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        String uploadPath = "uploads/" + fileName;

        file.transferTo(new java.io.File(uploadPath));

        ExporterDocument doc = new ExporterDocument();
        doc.setExporter(exporter);
        doc.setShipment(shipment);
        doc.setFileName(fileName);
        doc.setFileType(file.getContentType());
        doc.setFileUrl(uploadPath);

        return repo.save(doc);
    }
}

