package com.mined.crud.crudProductos_Mined.service;

import com.mined.crud.crudProductos_Mined.dto.ProductoCreateRequest;
import com.mined.crud.crudProductos_Mined.dto.ProductoUpdateRequest;
import com.mined.crud.crudProductos_Mined.dto.ProductoResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductoService {

    ProductoResponse create(ProductoCreateRequest request);

    Page<ProductoResponse> list(String q, Pageable pageable);

    ProductoResponse get(Long id);

    ProductoResponse update(Long id, ProductoUpdateRequest request);

    void deleteLogical(Long id);
}