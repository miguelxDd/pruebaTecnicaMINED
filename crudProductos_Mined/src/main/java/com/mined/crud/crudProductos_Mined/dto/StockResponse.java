package com.mined.crud.crudProductos_Mined.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockResponse {

    private Long id;

    private Long cantidad;

    private String ubicacion;

    private LocalDateTime ultimaActualizacion;
}