# Dockerfile para Angular Frontend - Versión Simple
FROM node:18

# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli@17

# Establecer directorio de trabajo
WORKDIR /app

# Copiar todo el proyecto
COPY . .

# Instalar todas las dependencias
RUN npm install

# Exponer puerto
EXPOSE 4200

# Configurar variables de entorno para mejor rendimiento
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV NG_CLI_ANALYTICS=false

# Comando para ejecutar en modo desarrollo
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--disable-host-check"]