package com.mined.crud.crudProductos_Mined.controller;

import com.mined.crud.crudProductos_Mined.dto.ProductoCreateRequest;
import com.mined.crud.crudProductos_Mined.dto.ProductoUpdateRequest;
import com.mined.crud.crudProductos_Mined.dto.ProductoResponse;
import com.mined.crud.crudProductos_Mined.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import jakarta.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService productoService;

    @PostMapping
    public ResponseEntity<ProductoResponse> create(@Valid @RequestBody ProductoCreateRequest request) {
        ProductoResponse response = productoService.create(request);
        
        // Crear Location header
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(response.getId())
                .toUri();
        
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .location(location)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<Page<ProductoResponse>> list(
            @RequestParam(required = false) String q,
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        
        Page<ProductoResponse> productos = productoService.list(q, pageable);
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoResponse> getById(@PathVariable Long id) {
        ProductoResponse response = productoService.get(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductoResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody ProductoUpdateRequest request) {
        
        ProductoResponse response = productoService.update(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productoService.deleteLogical(id);
        return ResponseEntity.noContent().build();
    }
}