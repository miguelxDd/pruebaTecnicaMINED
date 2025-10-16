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
public class ProductoCreateRequest {

    @NotBlank
    @Size(max = 150)
    private String nombre;

    @Size(max = 10000)
    private String descripcion;

    @NotNull
    @DecimalMin("0.0")
    @Digits(integer = 16, fraction = 2)
    private BigDecimal precio;

    @NotNull
    @Min(0)
    private Long stockCantidad;

    @Size(max = 100)
    private String stockUbicacion;
}