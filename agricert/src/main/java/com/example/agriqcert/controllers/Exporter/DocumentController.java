package com.example.agriqcert.controllers.Exporter;


import com.example.agriqcert.models.Exporter.ExporterDocument;
import com.example.agriqcert.services.Exporter.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/exporter/documents")
@CrossOrigin(origins = "http://localhost:5173")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @PostMapping("/upload/{exporterId}/{shipmentId}")
    public ExporterDocument uploadDocument(
            @PathVariable Long exporterId,
            @PathVariable Long shipmentId,
            @RequestParam("file") MultipartFile file
    ) throws Exception {
        return documentService.uploadDocument(exporterId, shipmentId, file);
    }
}
