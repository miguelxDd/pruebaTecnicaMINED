package com.mined.crud.crudProductos_Mined.service.impl;

import com.mined.crud.crudProductos_Mined.dto.ProductoCreateRequest;
import com.mined.crud.crudProductos_Mined.dto.ProductoUpdateRequest;
import com.mined.crud.crudProductos_Mined.dto.ProductoResponse;
import com.mined.crud.crudProductos_Mined.entity.Producto;
import com.mined.crud.crudProductos_Mined.exception.NotFoundException;
import com.mined.crud.crudProductos_Mined.mapper.ProductoMapper;
import com.mined.crud.crudProductos_Mined.repository.ProductoRepository;
import com.mined.crud.crudProductos_Mined.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;
    private final ProductoMapper productoMapper;
    private final com.mined.crud.crudProductos_Mined.repository.StockRepository stockRepository;

    @Override
    public ProductoResponse create(ProductoCreateRequest request) {
    // Validaciones
    validatePrecio(request.getPrecio());
    validateStockCantidad(request.getStockCantidad());

    // Crear entidad con mapper (sin stock)
    Producto producto = productoMapper.toEntity(request);
    producto.setStock(null); // Evitar persistencia en cascada con producto_id null

    // Guardar producto para obtener ID
    Producto savedProducto = productoRepository.save(producto);

    // Crear y guardar stock asociado al producto
    com.mined.crud.crudProductos_Mined.entity.Stock stock = com.mined.crud.crudProductos_Mined.entity.Stock.builder()
        .cantidad(request.getStockCantidad())
        .ubicacion(request.getStockUbicacion())
        .producto(savedProducto)
        .build();
    stock = stockRepository.save(stock);

    // Asociar stock al producto y guardar de nuevo
    savedProducto.setStock(stock);
    savedProducto = productoRepository.save(savedProducto);

    return productoMapper.toResponse(savedProducto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductoResponse> list(String q, Pageable pageable) {
        Page<Producto> productos;
        
        if (q == null || q.trim().isEmpty()) {
            productos = productoRepository.findByEstadoTrue(pageable);
        } else {
            productos = productoRepository.search(q.trim(), pageable);
        }
        
        return productos.map(productoMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductoResponse get(Long id) {
        Producto producto = productoRepository.findByIdAndEstadoTrue(id)
                .orElseThrow(() -> new NotFoundException("Producto no encontrado"));
        
        return productoMapper.toResponse(producto);
    }

    @Override
    public ProductoResponse update(Long id, ProductoUpdateRequest request) {
        // Cargar producto activo
        Producto producto = productoRepository.findByIdAndEstadoTrue(id)
                .orElseThrow(() -> new NotFoundException("Producto no encontrado"));

        // Validar campos no negativos si vienen
        if (request.getPrecio() != null) {
            validatePrecio(request.getPrecio());
        }
        if (request.getStockCantidad() != null) {
            validateStockCantidad(request.getStockCantidad());
        }

        // Aplicar updates con mapper
        productoMapper.applyUpdates(producto, request);
        
        // Guardar
        Producto updatedProducto = productoRepository.save(producto);
        
        return productoMapper.toResponse(updatedProducto);
    }

    @Override
    public void deleteLogical(Long id) {
        Producto producto = productoRepository.findByIdAndEstadoTrue(id)
                .orElseThrow(() -> new NotFoundException("Producto no encontrado"));
        
        // Borrado lógico
        producto.setEstado(false);
        productoRepository.save(producto);
    }

    private void validatePrecio(BigDecimal precio) {
        if (precio == null || precio.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("El precio debe ser mayor o igual a 0");
        }
    }

    private void validateStockCantidad(Long cantidad) {
        if (cantidad == null || cantidad < 0) {
            throw new IllegalArgumentException("La cantidad de stock debe ser mayor o igual a 0");
        }
    }
}