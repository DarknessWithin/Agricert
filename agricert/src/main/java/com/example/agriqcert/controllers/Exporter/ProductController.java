package com.example.agriqcert.controllers.Exporter;

import com.example.agriqcert.models.Exporter.Exporter_product;
import com.example.agriqcert.services.Exporter.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/exporter/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductService productService;

    // -------------------------------
    // ADD PRODUCT
    // -------------------------------
    @PostMapping("/add/{exporterId}")
    public ResponseEntity<?> addProduct(
            @PathVariable Long exporterId,
            @RequestBody Exporter_product product) {

        try {
            Exporter_product saved = productService.addProduct(exporterId, product);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Product added successfully");
            response.put("product", saved);

            return ResponseEntity.ok(response);

        } catch (Exception ex) {
            Map<String, Object> error = new HashMap<>();
            error.put("message", "Failed to add product");
            error.put("error", ex.getMessage());

            return ResponseEntity.status(500).body(error);
        }
    }

    // -------------------------------
    // GET ALL PRODUCTS OF EXPORTER
    // -------------------------------
    @GetMapping("/{exporterId}")
    public ResponseEntity<?> getProducts(@PathVariable Long exporterId) {

        try {
            List<Exporter_product> list = productService.getExporterProducts(exporterId);

            Map<String, Object> response = new HashMap<>();
            response.put("count", list.size());
            response.put("products", list);

            return ResponseEntity.ok(response);

        } catch (Exception ex) {
            Map<String, Object> error = new HashMap<>();
            error.put("message", "Failed to load products");
            error.put("error", ex.getMessage());

            return ResponseEntity.status(500).body(error);
        }
    }
    @GetMapping("/item/{productId}")
    public Exporter_product getProductById(@PathVariable Long productId) {
        return productService.getProductById(productId);
    }
//    @PutMapping("/")
//    public ResponseEntity<?> updateProduct(  @PathVariable Long exporterId,
//                                             @RequestBody Exporter_product product){
//
//
//    }
//    @DeleteMapping("{/deleteId}")
//    public ResponseEntity<?> deleteProductById(@PathVariable Long deleteId) {
//
//    }

}
