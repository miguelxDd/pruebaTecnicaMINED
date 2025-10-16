package com.mined.crud.crudProductos_Mined.repository;

import com.mined.crud.crudProductos_Mined.entity.Producto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    Page<Producto> findByEstadoTrue(Pageable pageable);

    Optional<Producto> findByIdAndEstadoTrue(Long id);

    @Query("SELECT p FROM Producto p WHERE p.estado = true AND LOWER(p.nombre) LIKE LOWER(CONCAT('%', :q, '%'))")
    Page<Producto> search(@Param("q") String q, Pageable pageable);
}