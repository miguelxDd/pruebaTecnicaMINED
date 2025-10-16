
-- Crear tablas (si no existen por Hibernate)
CREATE TABLE IF NOT EXISTS productos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stock (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    producto_id BIGINT NOT NULL,
    cantidad INT NOT NULL DEFAULT 0,
    ubicacion VARCHAR(255),
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

-- Insertar datos de muestra solo si las tablas están vacías
INSERT IGNORE INTO productos (id, nombre, descripcion, precio, estado) VALUES
-- Tecnología
(1, 'Laptop Dell Inspiron 15', 'Laptop Dell Inspiron 15 3000, procesador Intel Core i5, 8GB RAM, 256GB SSD, pantalla 15.6 pulgadas Full HD', 849.99, TRUE),
(2, 'Mouse Logitech MX Master 3', 'Mouse inalámbrico ergonómico con tecnología MagSpeed, conexión Bluetooth y USB, batería de larga duración', 99.99, TRUE),
(3, 'Teclado Mecánico Corsair K70', 'Teclado mecánico gaming RGB con switches Cherry MX Red, retroiluminación personalizable, reposamuñecas desmontable', 159.99, TRUE),
(4, 'Monitor Samsung 27" 4K', 'Monitor Samsung UJ59 27 pulgadas, resolución 4K UHD (3840x2160), panel VA, FreeSync, múltiples puertos', 299.99, TRUE),
(5, 'Auriculares Sony WH-1000XM4', 'Auriculares inalámbricos con cancelación de ruido líder en la industria, batería de 30 horas, carga rápida', 349.99, TRUE),

-- Oficina y Papeleria
(6, 'Silla Ergonómica Herman Miller', 'Silla de oficina ergonómica con soporte lumbar ajustable, reposabrazos 4D, base de aluminio pulido', 1299.99, TRUE),
(7, 'Escritorio Standing Desk', 'Escritorio ajustable en altura con motor eléctrico, superficie de bambú, memoria de posiciones, 120x60cm', 599.99, TRUE),
(8, 'Organizador de Escritorio Bambú', 'Organizador multifuncional de bambú con compartimentos para papelería, carga inalámbrica integrada', 45.99, TRUE),
(9, 'Lámpara LED Escritorio Xiaomi', 'Lámpara LED inteligente con control de temperatura de color, brillo ajustable, control por app móvil', 79.99, TRUE),
(10, 'Cámara Web Logitech C920', 'Cámara web Full HD 1080p con micrófono estéreo, enfoque automático, ideal para videoconferencias', 129.99, TRUE),

-- Hogar y Cocina
(11, 'Cafetera Espresso Breville', 'Cafetera espresso automática con molinillo integrado, pantalla LCD, vaporizador de leche profesional', 899.99, TRUE),
(12, 'Aspiradora Robot Roomba i7+', 'Aspiradora robot inteligente con vaciado automático, mapeo inteligente, compatible con Alexa y Google', 699.99, TRUE),
(13, 'Freidora de Aire Ninja Foodi', 'Freidora de aire multifuncional 8 en 1, capacidad 5.7L, tecnología de cocción dual, libre de aceite', 199.99, TRUE),
(14, 'Purificador de Aire Dyson', 'Purificador de aire con filtro HEPA, detector de calidad del aire, control por app, ventilador incluido', 549.99, TRUE),
(15, 'Licuadora Vitamix A3500', 'Licuadora de alta potencia con 5 programas automáticos, contenedor autodetectable, conectividad WiFi', 449.99, TRUE),

-- Deportes y Fitness
(16, 'Bicicleta Estática Peloton', 'Bicicleta estática con pantalla HD 22", clases en vivo y bajo demanda, métricas de rendimiento en tiempo real', 1895.00, TRUE),
(17, 'Pesas Ajustables Bowflex', 'Set de pesas ajustables de 5 a 52.5 lbs cada una, ahorro de espacio, cambio rápido de peso', 349.99, TRUE),
(18, 'Smartwatch Apple Watch Series 8', 'Reloj inteligente con GPS, monitor de frecuencia cardíaca, resistente al agua, pantalla Always-On Retina', 399.99, TRUE),
(19, 'Esterilla Yoga Premium Manduka', 'Esterilla de yoga antideslizante de caucho natural, grosor 6mm, tamaño estándar, eco-friendly', 89.99, TRUE),
(20, 'Botella Inteligente HidrateSpark', 'Botella de agua inteligente que rastrea tu hidratación, recordatorios LED, sincronización con app móvil, 590ml', 59.99, FALSE);

-- Insertar stock para cada producto
INSERT IGNORE INTO stock (id, producto_id, cantidad, ubicacion) VALUES
-- Tecnología
(1, 1, 15, 'Almacén Central - Estante A1'),
(2, 2, 45, 'Almacén Central - Estante A2'),
(3, 3, 23, 'Almacén Central - Estante A3'),
(4, 4, 8, 'Almacén Central - Estante B1'),
(5, 5, 12, 'Almacén Central - Estante B2'),

-- Oficina y Papelería
(6, 6, 5, 'Almacén Norte - Zona Muebles'),
(7, 7, 10, 'Almacén Norte - Zona Muebles'),
(8, 8, 67, 'Almacén Central - Estante C1'),
(9, 9, 34, 'Almacén Central - Estante C2'),
(10, 10, 28, 'Almacén Central - Estante C3'),

-- Hogar y Cocina
(11, 11, 7, 'Almacén Sur - Electrodomésticos'),
(12, 12, 3, 'Almacén Sur - Electrodomésticos'),
(13, 13, 18, 'Almacén Sur - Electrodomésticos'),
(14, 14, 6, 'Almacén Sur - Electrodomésticos'),
(15, 15, 4, 'Almacén Sur - Electrodomésticos'),

-- Deportes y Fitness
(16, 16, 2, 'Almacén Oeste - Deportes'),
(17, 17, 25, 'Almacén Oeste - Deportes'),
(18, 18, 35, 'Almacén Central - Estante D1'),
(19, 19, 89, 'Almacén Oeste - Deportes'),
(20, 20, 0, 'Almacén Central - Sin Stock');