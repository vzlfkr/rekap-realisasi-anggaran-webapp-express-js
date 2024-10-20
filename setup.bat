@echo off
echo Starting setup...

echo Copying .env file...
call copy-env.bat

echo Running backend install...
call install-backend.bat

echo Running database migration...
call migrate-database.bat

echo Running frontend install...
call install-frontend.bat

echo Setup complete! Now you can run the web app using start-webapp.bat
pause
