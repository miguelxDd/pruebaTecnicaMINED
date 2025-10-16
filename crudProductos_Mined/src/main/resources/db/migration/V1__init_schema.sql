
-- ================================================
-- SCHEMA INICIAL: CRUD de Productos y Stock
-- MySQL 8.0 Compatible
-- ================================================

-- ========================
-- TABLA: productos
-- ========================
CREATE TABLE productos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion VARCHAR(10000),
    precio DECIMAL(16, 2) NOT NULL CHECK (precio >= 0),
    estado TINYINT(1) NOT NULL DEFAULT TRUE,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_productos_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================
-- TABLA: stock
-- ========================
CREATE TABLE stock (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    producto_id BIGINT NOT NULL,
    cantidad BIGINT NOT NULL CHECK (cantidad >= 0),
    ubicacion VARCHAR(100),
    ultima_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_stock_producto FOREIGN KEY (producto_id) 
        REFERENCES productos (id) 
        ON DELETE CASCADE,
    CONSTRAINT unq_stock_producto UNIQUE (producto_id),
    INDEX idx_stock_producto_id (producto_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;