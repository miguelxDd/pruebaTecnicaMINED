package com.mined.crud.crudProductos_Mined.repository;

import com.mined.crud.crudProductos_Mined.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {

    Optional<Stock> findByProductoId(Long productoId);
}