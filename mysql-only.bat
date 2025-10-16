@echo off
echo ========================================
echo    CRUD - Solo MySQL en Docker
echo    Backend y Frontend locales
echo ========================================
echo.

echo [1] Iniciando solo MySQL en Docker...
docker-compose -f docker-compose-mysql-only.yml up -d

echo.
echo [2] Esperando que MySQL esté listo...
timeout /t 30 /nobreak > nul

echo.
echo ========================================
echo    ✓ MySQL listo en puerto 3307
echo ========================================
echo.

echo Ahora puedes ejecutar:
echo.
echo [Backend] En terminal 1:
echo   cd crudProductos_Mined
echo   mvn spring-boot:run
echo.
echo [Frontend] En terminal 2: 
echo   cd crud-productos-ui
echo   npm start
echo.
echo URLs:
echo - MySQL:    localhost:3307
echo - Backend:  http://localhost:8089 (cuando lo inicies)
echo - Frontend: http://localhost:4200 (cuando lo inicies)
echo.
echo Para detener MySQL:
echo   docker-compose -f docker-compose-mysql-only.yml down
echo.
pause