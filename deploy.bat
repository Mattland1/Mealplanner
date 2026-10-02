@echo off
setlocal
title Deploy What's for Gin-ner?

cd /d "%~dp0"

where git >nul 2>nul
if errorlevel 1 (
    echo Git was not found. Install Git or add it to PATH, then try again.
    echo.
    pause
    exit /b 1
)

git rev-parse --is-inside-work-tree >nul 2>nul
if errorlevel 1 (
    echo This folder is not a Git repository. Deployment stopped.
    echo.
    pause
    exit /b 1
)

echo Making sure the deployment uses the main branch...
git switch main
if errorlevel 1 (
    echo.
    echo Could not switch to main. Resolve the Git error above, then try again.
    echo Deployment stopped before Docker was changed.
    echo.
    pause
    exit /b 1
)

set "CURRENT_BRANCH="
for /f "delims=" %%B in ('git branch --show-current') do set "CURRENT_BRANCH=%%B"
if not "%CURRENT_BRANCH%"=="main" (
    echo.
    echo Git reported branch "%CURRENT_BRANCH%" instead of "main". Deployment stopped.
    echo.
    pause
    exit /b 1
)

where docker >nul 2>nul
if errorlevel 1 (
    echo Docker was not found. Start Docker Desktop and try again.
    echo.
    pause
    exit /b 1
)

echo Ginny is fetching a fresh build...
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
