package com.mined.crud.crudProductos_Mined.mapper;

import com.mined.crud.crudProductos_Mined.dto.ProductoCreateRequest;
import com.mined.crud.crudProductos_Mined.dto.ProductoUpdateRequest;
import com.mined.crud.crudProductos_Mined.dto.ProductoResponse;
import com.mined.crud.crudProductos_Mined.dto.StockResponse;
import com.mined.crud.crudProductos_Mined.entity.Producto;
import com.mined.crud.crudProductos_Mined.entity.Stock;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ProductoMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "estado", constant = "true")
    @Mapping(target = "fechaCreacion", ignore = true)
    @Mapping(target = "stock", ignore = true)
    Producto toEntity(ProductoCreateRequest request);

    @AfterMapping
    default void createStock(@MappingTarget Producto producto, ProductoCreateRequest request) {
        Stock stock = Stock.builder()
                .cantidad(request.getStockCantidad())
                .ubicacion(request.getStockUbicacion())
                .producto(producto)
                .build();
        producto.setStock(stock);
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "estado", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    @Mapping(target = "stock", ignore = true)
    void applyUpdates(@MappingTarget Producto producto, ProductoUpdateRequest request);

    @AfterMapping
    default void updateStock(@MappingTarget Producto producto, ProductoUpdateRequest request) {
        if (request.getStockCantidad() != null || request.getStockUbicacion() != null) {
            Stock stock = producto.getStock();
            
            if (stock == null) {
                // Crear stock si no existe
                stock = Stock.builder()
                        .producto(producto)
                        .build();
                producto.setStock(stock);
            }
            
            // Actualizar campos si no son nulos
            if (request.getStockCantidad() != null) {
                stock.setCantidad(request.getStockCantidad());
            }
            if (request.getStockUbicacion() != null) {
                stock.setUbicacion(request.getStockUbicacion());
            }
        }
    }

    @Mapping(target = "stock", source = "stock")
    ProductoResponse toResponse(Producto producto);

    StockResponse toStockResponse(Stock stock);
}