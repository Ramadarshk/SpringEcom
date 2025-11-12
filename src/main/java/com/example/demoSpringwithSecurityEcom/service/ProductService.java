package com.example.demoSpringwithSecurityEcom.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demoSpringwithSecurityEcom.model.Product;
import com.example.demoSpringwithSecurityEcom.repository.ProductRepository;

@Service
public class ProductService {
    @Autowired
    ProductRepository repo; 
    public List<Product> getProducts() {
        return repo.findAll();
    }
    public Product getProductById(int id) {
        return repo.findById(id).orElse( null);
    }
    public void addProduct(Product product, MultipartFile imageFile) throws IOException {
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageData(imageFile.getBytes());
        repo.save(product);
    }
    public Product updateProduct(int id, Product updatedProduct, MultipartFile imageFile) throws IOException {
       if(repo.existsById(id))
        {
            if (imageFile != null && !imageFile.isEmpty()) { updatedProduct.setImageName(imageFile.getOriginalFilename());
        updatedProduct.setImageType(imageFile.getContentType());
        updatedProduct.setImageData(imageFile.getBytes());
        }
        repo.save(updatedProduct);
    
        return updatedProduct;}
        return null;
    }
    public void deleteProduct(int id) {
        repo.deleteById(id);
    }
    public List<Product> searchBy(String keyword) {
        return repo.searchBy(keyword);
    }
}
