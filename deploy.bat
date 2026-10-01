@echo off
setlocal
title Deploy Savor Mealplanner

cd /d "%~dp0"

where docker >nul 2>nul
if errorlevel 1 (
    echo Docker was not found. Start Docker Desktop and try again.
    echo.
    pause
    exit /b 1
)

echo Building and deploying Savor...
echo.
docker compose up --build -d
if errorlevel 1 (
    echo.
    echo Deployment failed. Review the Docker output above.
    echo.
    pause
    exit /b 1
)

echo.
docker compose ps
if errorlevel 1 (
    echo.
    echo Deployment completed, but the container status could not be read.
    echo.
    pause
    exit /b 1
)

echo.
echo Deployment complete: http://localhost:4173
echo.
pause
