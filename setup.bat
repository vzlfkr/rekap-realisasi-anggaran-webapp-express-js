@echo off
setlocal
set current_dir=%~dp0

echo Starting setup...

echo Copying .env file...
call "%current_dir%copy-env.bat"

echo Running backend install...
call "%current_dir%install-backend.bat"

echo Running database migration...
call "%current_dir%migrate-database.bat"

echo Running frontend install...
call "%current_dir%install-frontend.bat"

echo Setup complete! Now you can run the web app using start-webapp.bat
pause
