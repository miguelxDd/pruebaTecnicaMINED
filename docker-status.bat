@echo off
echo ========================================
echo    Estado de contenedores Docker
echo ========================================
echo.

echo [1] TODOS los contenedores en tu sistema:
docker ps -a --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"

echo.
echo [2] Solo contenedores de CRUD Productos:
docker ps -a --filter "name=crud-" --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"

echo.
echo [3] Volúmenes relacionados con el proyecto:
docker volume ls | findstr /i "crud\|mysql"

echo.
echo [4] Imágenes del proyecto:
docker images | findstr /i "crud\|productos"

echo.
echo ========================================
echo    Scripts disponibles SEGUROS:
echo ========================================
echo • docker-start.bat         ← Inicio inteligente y seguro ⭐
echo • docker-simple.bat        ← Inicio básico y rápido
echo • mysql-only.bat           ← Solo MySQL en Docker
echo • docker-stop.bat          ← Detener solo este proyecto
echo • docker-clean.bat         ← Limpiar solo este proyecto
echo • docker-status.bat        ← Este script (diagnóstico)
echo.
pause