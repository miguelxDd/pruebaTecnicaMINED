# Dockerfile para Spring Boot Backend - Versión Simple y Estable
FROM openjdk:17

# Establecer directorio de trabajo
WORKDIR /app

# Copiar todo el código fuente
COPY . .

# Hacer ejecutable el wrapper de Maven (si existe)
RUN chmod +x mvnw || true

# Compilar la aplicación (usar Maven del sistema si mvnw falla)
RUN ./mvnw clean package -DskipTests || mvn clean package -DskipTests

# Exponer puerto
EXPOSE 8089

# Configurar variables de entorno
ENV SPRING_PROFILES_ACTIVE=docker

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "target/crudProductos_Mined-0.0.1-SNAPSHOT.jar"]