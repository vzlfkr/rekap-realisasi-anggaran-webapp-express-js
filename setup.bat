@echo off
echo Installing backend dependencies...
cd express-backend
npm install
cd..

echo Installing frontend dependencies...
cd react-frontend
npm install
cd..

echo Running Prisma migrations...
cd express-backend
npx prisma migrate deploy
cd..

echo Setup complete!
pause
