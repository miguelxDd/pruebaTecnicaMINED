@echo off
echo ========================================
echo    Limpieza SEGURA - Solo CRUD Productos
echo ========================================
echo.
echo ⚠️  IMPORTANTE: Este script SOLO elimina contenedores de este proyecto
echo     NO afectará otros contenedores de Docker que tengas
echo.

echo Contenedores que serán eliminados (si existen):
echo - crud-mysql
echo - crud-backend  
echo - crud-frontend
echo - crud-mysql-only
echo.

set /p confirm="¿Continuar? (s/N): "
if /i NOT "%confirm%"=="s" (
    echo Operación cancelada
    pause
    exit /b 0
)

echo.
echo [1] Deteniendo contenedores específicos de este proyecto...
docker stop crud-mysql crud-backend crud-frontend crud-mysql-only 2>nul
docker rm crud-mysql crud-backend crud-frontend crud-mysql-only 2>nul

echo.
echo [2] Usando docker-compose para limpieza segura...
docker-compose down -v 2>nul
if exist "docker-compose-auto.yml" (
    docker-compose -f docker-compose-auto.yml down -v 2>nul
)
if exist "docker-compose-simple.yml" (
    docker-compose -f docker-compose-simple.yml down -v 2>nul
)
if exist "docker-compose-mysql-only.yml" (
    docker-compose -f docker-compose-mysql-only.yml down -v 2>nul
)

echo.
echo [3] Eliminando SOLO imágenes de este proyecto...
docker rmi crud-backend crud-frontend 2>nul
docker rmi crudproductos_mined-backend crudproductos_mined-frontend 2>nul
docker rmi crudproductos_mined_backend crudproductos_mined_frontend 2>nul

echo.
echo [4] Eliminando SOLO volúmenes de este proyecto...
docker volume rm crudproductos_mined_mysql_data 2>nul
docker volume rm mysql_data 2>nul
docker volume rm mysql_data_only 2>nul

echo.
echo [5] Limpiando archivos temporales...
if exist "docker-compose-auto.yml" (
    del docker-compose-auto.yml
    echo Archivo docker-compose-auto.yml eliminado
)

echo.
echo ========================================
echo ✓ Limpieza segura completada
echo   Solo se eliminaron contenedores de este proyecto
echo ========================================
pause