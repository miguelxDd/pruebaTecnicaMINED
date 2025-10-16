#  Sistema CRUD de Productos y Stock

**Desarrollado por: Miguel Antonio Amaya Hernández**  
**Proyecto: Prueba Técnica - MINSAL El Salvador**  
**Fecha: Octubre 2025**

---

##  Descripción del Sistema

Sistema completo de gestion de productos y stock desarrollado con arquitectura de microservicios, que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre productos y gestionar su inventario de manera eficiente.

###  Funcionalidades Principales

-  **Gestión de Productos**: Crear, editar, ver y eliminar productos
-  **Control de Stock**: Manejo de inventario por ubicación  
-  **Búsqueda Dinámica**: Sistema de filtrado en tiempo real
-  **Interfaz Moderna**: UI responsive con Material Design
-  **Validaciones**: Control de datos tanto en frontend como backend
-  **Alertas Inteligentes**: Notificaciones con SweetAlert2
-  **Estados Vacíos**: Guías para el usuario cuando no hay datos

---

## Tecnologías Utilizadas

### **Backend (Spring Boot)**
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Spring Boot** | 3.5.6 | Framework principal del backend |
| **Java** | 17 | Lenguaje de programación |
| **MySQL** | 8.0 | Base de datos relacional |
| **JPA/Hibernate** | 6.2.11 | ORM para persistencia |
| **Flyway** | 11.7.2 | Migraciones de base de datos |
| **MapStruct** | 1.5.5 | Mapeo de DTOs |

### **Frontend (Angular)**
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Angular** | 17 | Framework frontend |
| **TypeScript** | 5.2 | Lenguaje de programación |
| **Angular Material** | 17 | Componentes UI |
| **RxJS** | 7.8 | Programación reactiva |
| **SweetAlert2** | 11.10 | Alertas modernas |
| **SCSS** | - | Estilos avanzados |

### **DevOps & Contenedores**
| Tecnología | Propósito |
|------------|-----------|
| **Docker** | Contenedorización |
| **Docker Compose** | Orquestación de servicios |
| **Scripts Batch** | Automatización de despliegue |

---
### **Flujo de Datos**
1. **Frontend**: Angular envía peticiones HTTP REST
2. **Backend**: Spring Boot procesa la lógica de negocio  
3. **Persistencia**: JPA/Hibernate gestiona la base de datos
4. **Respuesta**: Datos JSON de vuelta al frontend

---
##  Tipos de Validaciones Implementadas

### **Frontend (Angular)**
-  **Validación de Formularios**: Campos requeridos, formatos
-  **Validación en Tiempo Real**: Feedback inmediato al usuario
-  **Validación de Precios**: Solo números positivos
-  **Validación de Longitud**: Límites en campos de texto
-  **Validación de Estados**: Booleanos para producto activo/inactivo

### **Backend (Spring Boot)**
-  **Validación de DTOs**: `@Valid`, `@NotNull`, `@Size`
-  **Validación de Negocio**: Reglas específicas del dominio
-  **Validación de Base de Datos**: Constraints y relaciones
-  **Manejo de Excepciones**: Respuestas HTTP apropiadas
-  **Validación CORS**: Seguridad en peticiones cross-origin

### **Base de Datos (MySQL)**
-  **Constraints de Integridad**: Claves foráneas
-  **Validación de Tipos**: DECIMAL para precios, VARCHAR para textos
-  **Validación de Nulos**: NOT NULL en campos requeridos
-  **Validación de Rangos**: CHECK constraints para precios positivos

---

##  Cómo Ejecutar el Sistema

### ** Requisitos Previos**
- **Docker Desktop** instalado y corriendo
- **Git** para clonar el repositorio  
- **Puertos libres**: 3307 (MySQL), 4200 (Angular), 8089 (Spring Boot)

### ** Métodos de Ejecución**

#### **Método 1: Docker Completo (Recomendado)** ⭐
```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd crudProductos_Mined

# 2. Verificar estado de contenedores
docker-status.bat

# 3. Ejecutar sistema completo
docker-start.bat

# 4. Acceder a las URLs:
# - Frontend: http://localhost:4200
# - Backend:  http://localhost:8089
# - Database: localhost:3307
```

#### **Método 2: Docker Simple**
```bash
# Para setup más básico y rápido
docker-simple.bat
```

#### **Método 3: Solo MySQL en Docker** 🏃
```bash
# 1. Iniciar solo base de datos
mysql-only.bat

# 2. En terminal separada - Backend:
cd crudProductos_Mined
mvn spring-boot:run -Dspring.profiles.active=mysql-docker

# 3. En otra terminal - Frontend:
cd crud-productos-ui 
npm install
npm start
```

### ** Detener el Sistema**
```bash
# Detener todos los contenedores del proyecto
docker-stop.bat

# O limpiar completamente (eliminar datos)
docker-clean.bat
```

### ** Monitoreo y Status**
```bash
# Ver estado de todos los contenedores
docker-status.bat

# Ver logs en tiempo real
docker-compose -f docker-compose-safe.yml logs -f
```

---

##  Estructura del Proyecto

```
crudProductos_Mined/
├── 📁 crudProductos_Mined/          # Backend Spring Boot
│   ├── 📁 src/main/java/com/mined/crud/
│   │   ├── 📁 controller/            # REST Controllers
│   │   ├── 📁 service/              # Lógica de negocio 
│   │   ├── 📁 repository/           # Acceso a datos
│   │   ├── 📁 entity/               # Entidades JPA
│   │   ├── 📁 dto/                  # Data Transfer Objects
│   │   ├── 📁 mapper/               # MapStruct mappers
│   │   ├── 📁 config/               # Configuraciones
│   │   └── 📁 exception/            # Manejo de excepciones
│   ├── 📁 src/main/resources/
│   │   ├── 📁 db/migration/         # Scripts Flyway
│   │   ├── 📄 application.properties
│   │   └── 📄 application-*.properties
│   ├── 📄 Dockerfile               # Imagen Docker backend
│   └── 📄 pom.xml                  # Dependencias Maven
├── 📁 crud-productos-ui/           # Frontend Angular
│   ├── 📁 src/app/
│   │   ├── 📁 productos/            # Módulo productos
│   │   │   ├── 📁 producto-list/    # Listado con búsqueda
│   │   │   ├── 📁 producto-detail/  # Vista detalle
│   │   │   └── 📁 producto-form/    # Formulario CRUD
│   │   ├── 📁 shared/               # Servicios y modelos
│   │   │   ├── 📁 services/         # HTTP Services
│   │   │   └── 📁 models/           # Interfaces TypeScript
│   │   └── 📄 app.component.*       # Componente principal
│   ├── 📄 Dockerfile               # Imagen Docker frontend
│   └── 📄 package.json             # Dependencias npm
├── 📄 docker-compose.yml           # Orquestación principal
├── 📄 docker-init.sql              # Datos iniciales
├── 📄 docker-start.bat             # Inicio inteligente
├── 📄 docker-stop.bat              # Detener seguro
├── 📄 docker-clean.bat             # Limpiar proyecto
├── 📄 docker-simple.bat            # Inicio rápido
├── 📄 mysql-only.bat               # Solo base de datos
├── 📄 docker-status.bat            # Ver estado
└── 📄 README.md                    # Esta documentación
```

---

## 🌟Características Especiales

### ** Experiencia de Usuario**
- **Búsqueda en Tiempo Real**: Filtrado con debounce de 300ms
- **Estados Vacíos**: Mensajes guía cuando no hay productos  
- **Confirmaciones**: Modales de confirmación para eliminaciones
- **Feedback Visual**: Indicadores de carga y estados
- **Responsive Design**: Adaptable a móviles y desktop

### ** Optimizaciones de Rendimiento**
- **Lazy Loading**: Carga diferida de módulos Angular
- **Paginación**: Manejo eficiente de grandes listas
- **Caché HTTP**: Optimización de peticiones
- **Docker Multi-stage**: Builds optimizados
- **Índices DB**: Consultas rápidas en MySQL

### ** Seguridad Implementada**
- **CORS Configurado**: Solo orígenes permitidos
- **Validación Dual**: Frontend y backend  
- **SQL Injection Prevention**: JPA/Hibernate
- **Error Handling**: No exposición de detalles internos

---



## 📊 Datos de Prueba

El sistema incluye **20 productos de muestra** distribuidos en 4 categorías:

-  **Tecnología** (5 productos): Laptops, mouse, teclados, monitores, auriculares
-  **Oficina y Papelería** (5 productos): Sillas, escritorios, organizadores, lámparas, cámaras
-  **Hogar y Cocina** (5 productos): Cafeteras, aspiradoras, freidoras, purificadores, licuadoras  
-  **Deportes y Fitness** (5 productos): Bicicletas, pesas, smartwatches, esterillas, botellas

**Cada producto incluye**:
-  Stock correspondiente con ubicación de almacén
-  Precios realistas y variados
-  Descripciones detalladas
-  Estados activos/inactivos

---

##  Desarrollado por

**👨‍💻 Miguel Antonio Amaya Hernández**  
**🏥 Prueba Técnica - MINSAL El Salvador**  
**📅 Octubre 2025**

### 📧 Contacto
- **Email**: [ah18059@ues.edu.sv]
- **GitHub**: [miguelxDd]

---

##  Soporte y Troubleshooting

### **Problemas Comunes**

** Puerto ocupado**
```bash
# Verificar qué usa el puerto
netstat -ano | findstr :3307

```

** Contenedor no inicia**
```bash
docker logs crud-backend
```

** Base de datos no conecta**
```bash
# Verificar MySQL
docker ps | findstr mysql
docker logs crud-mysql
```

### **Para Más Ayuda**
1. Ejecutar `docker-status.bat` para diagnóstico
2. Revisar logs con `docker logs <container-name>`
3. Usar `docker-clean.bat` para reset completo

---

##  Notas de Desarrollo

- **Perfiles de Spring Boot**: `default`, `docker`, `mysql-docker`
- **Puertos por defecto**: MySQL:3307, Backend:8089, Frontend:4200
- **Base de datos**: Se crea automáticamente con datos de prueba
- **Hot Reload**: Habilitado en modo desarrollo
- **CORS**: Configurado para desarrollo local

---