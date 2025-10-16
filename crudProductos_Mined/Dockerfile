# ETAPA 1: Construcción con Maven
FROM maven:3.9-eclipse-temurin-17 AS builder

# Establecer directorio de trabajo
WORKDIR /build

# Copiar archivos de Maven primero (para cache de dependencias)
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Descargar dependencias (se cachea esta capa)
RUN mvn dependency:go-offline -B || true

# Copiar el código fuente
COPY src ./src

# Compilar la aplicación
RUN mvn clean package -DskipTests -B

# Verificar que el JAR existe
RUN ls -la target/ && \
    test -f target/crudProductos_Mined-0.0.1-SNAPSHOT.jar || \
    (echo "ERROR: JAR no encontrado" && exit 1)

# ETAPA 2: Imagen de ejecución ligera
FROM eclipse-temurin:17-jre-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar el JAR compilado desde la etapa anterior
COPY --from=builder /build/target/crudProductos_Mined-0.0.1-SNAPSHOT.jar app.jar

# Verificar que el JAR se copió correctamente
RUN ls -la /app/ && test -f /app/app.jar

# Exponer puerto
EXPOSE 8089

# Configurar variables de entorno
ENV SPRING_PROFILES_ACTIVE=docker

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "/app/app.jar"]