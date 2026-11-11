@echo off
echo =========================================
echo   Iniciando Autolote J^&L Imports (GSW)
echo =========================================
echo.
echo Construyendo la imagen de Docker...
docker build -t autolote-api .
echo.
echo Levantando el clúster y el servidor Nginx...
docker compose up -d
echo.
echo El sistema estara disponible en https://localhost
echo.
pause