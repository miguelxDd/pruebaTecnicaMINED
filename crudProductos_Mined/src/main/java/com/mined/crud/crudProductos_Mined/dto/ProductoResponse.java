package com.mined.crud.crudProductos_Mined.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductoResponse {

    private Long id;

    private String nombre;

    private String descripcion;

    private BigDecimal precio;

    private Boolean estado;

    private LocalDateTime fechaCreacion;

    private StockResponse stock;
}