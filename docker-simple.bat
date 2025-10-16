@echo off
echo ========================================
echo    CRUD Productos - Inicio Simple
echo ========================================
echo.

echo [1] Limpiando contenedores anteriores...
docker-compose down -v 2>nul
docker stop crud-mysql crud-backend crud-frontend 2>nul
docker rm crud-mysql crud-backend crud-frontend 2>nul

echo.
echo [2] Construyendo imagen del backend (puede tomar 3-5 minutos)...
echo     Compilando con Maven dentro de Docker...
docker-compose build --no-cache backend

if errorlevel 1 (
    echo.
    echo ERROR: Falló la construcción del backend
    echo Revisa los logs arriba para más detalles
    pause
    exit /b 1
)

echo.
echo [3] Construyendo imagen del frontend...
docker-compose build frontend

echo.
echo [4] Iniciando todos los servicios...
docker-compose up -d

echo.
echo [5] Esperando que los servicios estén listos...
echo     MySQL: ~30 segundos
echo     Backend: ~60 segundos  
echo     Frontend: ~90 segundos
timeout /t 90 /nobreak > nul

echo.
echo ========================================
echo    ✓ SERVICIOS INICIADOS
echo ========================================
echo - Frontend: http://localhost:4200
echo - Backend:  http://localhost:8089/swagger-ui.html
echo - MySQL:    localhost:3307
echo ========================================
echo.

echo [6] Verificando estado de los contenedores...
docker-compose ps

echo.
echo [7] ¿Ver logs del backend para verificar? (y/N)
set /p logs="Respuesta: "
if /i "%logs%"=="y" (
    docker-compose logs backend
    echo.
    echo ¿Seguir viendo logs en tiempo real? (y/N)
    set /p follow="Respuesta: "
    if /i "%follow%"=="y" (
        docker-compose logs -f
    )
) else (
    echo.
    echo ✓ Todo listo!
    echo.
    echo Comandos útiles:
    echo   - Ver logs:    docker-compose logs -f
    echo   - Ver estado:  docker-compose ps
    echo   - Detener:     docker-compose down
)

pause