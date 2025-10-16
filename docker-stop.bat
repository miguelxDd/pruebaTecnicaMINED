@echo off
echo ========================================
echo    Detener servicios Docker SEGURAMENTE
echo    Solo contenedores de CRUD Productos
echo ========================================
echo.

echo Contenedores que serán detenidos:
docker ps --filter "name=crud-" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo.
set /p confirm="¿Detener estos contenedores? (s/N): "
if /i NOT "%confirm%"=="s" (
    echo Operación cancelada
    pause
    exit /b 0
)

echo.
echo [1] Deteniendo contenedores específicos del proyecto...

:: Intentar detener usando archivos de configuración específicos
if exist "docker-compose-safe.yml" (
    echo Deteniendo configuración segura...
    docker-compose -f docker-compose-safe.yml down
)
if exist "docker-compose-auto.yml" (
    echo Deteniendo configuración auto-generada...
    docker-compose -f docker-compose-auto.yml down
)
:: Usar configuración principal
echo Deteniendo configuración principal...
docker-compose down

:: Fallback: detener por nombre específico
docker stop crud-mysql crud-backend crud-frontend crud-mysql-only 2>nul
docker rm crud-mysql crud-backend crud-frontend crud-mysql-only 2>nul

echo.
echo [Opcional] ¿Eliminar también los volúmenes de datos de ESTE PROYECTO? (y/N)
set /p choice="Respuesta: "

if /i "%choice%"=="y" (
    echo Eliminando SOLO volúmenes de este proyecto...
    docker volume rm mysql_data mysql_data_safe mysql_data_only 2>nul
    docker volume rm crudproductos_mined_mysql_data 2>nul
    echo Volúmenes del proyecto eliminados.
) else (
    echo Volúmenes conservados.
)

:: Limpiar archivos temporales
if exist "docker-compose-auto.yml" (
    del docker-compose-auto.yml
    echo Configuración temporal eliminada.
)
if exist "docker-compose-safe.yml" (
    del docker-compose-safe.yml
    echo Configuración segura eliminada.
)

echo.
echo ========================================
echo ✓ Solo contenedores de CRUD Productos detenidos
echo   Otros contenedores NO fueron afectados
echo ========================================
pause