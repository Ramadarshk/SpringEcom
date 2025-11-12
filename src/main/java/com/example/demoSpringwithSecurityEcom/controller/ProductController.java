package com.example.demoSpringwithSecurityEcom.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demoSpringwithSecurityEcom.model.Product;
import com.example.demoSpringwithSecurityEcom.service.ProductService;


@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductController {
    @Autowired
    ProductService service;
    @GetMapping("/")
    public String home() {
        return "Welcome to the Product API";
    }
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts() {
        return new ResponseEntity<>(service.getProducts(),HttpStatus.OK);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity< Product> getProductById(@PathVariable int id) {
        Product prod = service.getProductById(id);
        if(prod == null) 
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        
        return new ResponseEntity<>(prod,HttpStatus.OK);
    }
    @PostMapping("/product")
    public ResponseEntity<?> addProduct(@RequestPart Product product,@RequestPart MultipartFile imageFile) {
       try { service.addProduct(product,imageFile);
    return new ResponseEntity<>("Product Added",HttpStatus.CREATED);}
         catch(Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
         }
    }

    @GetMapping("/product/{id}/image")
    public ResponseEntity<byte[]> sendImage(@PathVariable int id) {
            Product prod = service.getProductById(id);
            byte[] imageData = prod.getImageData();
            return ResponseEntity.ok().contentType(MediaType.valueOf(prod.getImageType())).body(imageData);
    }

   @PutMapping("/product/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable int id,
            @RequestPart("product") Product updatedProduct,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
        try {
            Product savedProduct = service.updateProduct(id, updatedProduct, imageFile);
            return new ResponseEntity<>(savedProduct, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/product/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
     Product product = service.getProductById(id);
     if (product == null) {
        return new ResponseEntity<>("Product Not Found", HttpStatus.NOT_FOUND);
     } else {
        service.deleteProduct(id);
        return new ResponseEntity<>("Product Deleted", HttpStatus.OK);
        
     }
    }

    @GetMapping("/products/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword) {
        List<Product> results = service.searchBy(keyword);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }
}
