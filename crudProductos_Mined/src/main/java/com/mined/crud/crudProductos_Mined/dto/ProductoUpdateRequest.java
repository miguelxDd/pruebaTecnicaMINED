package com.mined.crud.crudProductos_Mined.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductoUpdateRequest {

    private String nombre;

    private String descripcion;

    @DecimalMin(value = "0.0", message = "El precio debe ser mayor o igual a 0")
    @Digits(integer = 16, fraction = 2)
    private BigDecimal precio;

    @Min(value = 0, message = "La cantidad de stock debe ser mayor o igual a 0")
    private Long stockCantidad;

    private String stockUbicacion;
}