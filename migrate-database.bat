@echo off
echo Running Prisma migrations...
cd express-backend
npx prisma migrate deploy
cd..
echo Prisma migrations completed!
pause
