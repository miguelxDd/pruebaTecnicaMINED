package com.mined.crud.crudProductos_Mined.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "stock")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Min(0)
    private Long cantidad;

    @Size(max = 100)
    private String ubicacion;

    @Column(name = "ultima_actualizacion")
    private LocalDateTime ultimaActualizacion;

    @OneToOne
    @JoinColumn(name = "producto_id", nullable = false, unique = true)
    private Producto producto;

    @PrePersist
    protected void onCreate() {
        ultimaActualizacion = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        ultimaActualizacion = LocalDateTime.now();
    }
}