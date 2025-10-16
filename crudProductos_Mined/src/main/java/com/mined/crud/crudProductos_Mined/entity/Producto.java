package com.mined.crud.crudProductos_Mined.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "productos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
    @Column(columnDefinition = "TINYINT(1)")
    private Boolean estado;

    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    @OneToOne(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Stock stock;

    @PrePersist
    protected void onCreate() {
        if (fechaCreacion == null) {
            fechaCreacion = LocalDateTime.now();
        }
    }
}