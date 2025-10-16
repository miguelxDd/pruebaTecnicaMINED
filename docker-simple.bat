@echo off
echo ========================================
echo    CRUD Productos - Inicio Simple
echo ========================================
echo.

echo [1] Deteniendo SOLO contenedores de este proyecto...
docker-compose down -v 2>nul
docker stop crud-mysql crud-backend crud-frontend 2>nul
docker rm crud-mysql crud-backend crud-frontend 2>nul

echo.
echo [2] Construyendo imágenes frescas...
docker-compose build --no-cache

echo.
echo [3] Iniciando servicios...
docker-compose up -d

echo.
echo [4] Esperando que los servicios estén listos...
echo     Esto puede tomar 2-3 minutos...
timeout /t 60 /nobreak > nul

echo.
echo ========================================
echo    ✓ Servicios iniciados
echo ========================================
echo - Frontend (Angular): http://localhost:4200
echo - Backend (Spring):   http://localhost:8089
echo - Base de datos:      localhost:3307
echo ========================================
echo.

echo [5] ¿Ver logs en tiempo real? (y/N)
set /p logs="Respuesta: "
if /i "%logs%"=="y" (
    docker-compose logs -f
) else (
    echo ✓ Listo para usar!
    echo Para ver logs: docker-compose logs -f
    echo Para detener:  docker-compose down
)

pause