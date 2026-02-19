@echo off
echo Starting CRM System...

echo 1. Starting Database...
start "MongoDB" mongod --dbpath d:\CRM\data\db

echo Waiting for DB to initialize...
timeout /t 5 >nul

echo 2. Starting Backend Server...
start "Backend API" cmd /k "cd backend && npm run dev"

echo 3. Starting Admin Panel...
start "Admin Panel" cmd /k "cd admin-panel && npm run dev"

echo 4. Starting Mobile App...
start "Mobile App" cmd /k "cd mobile-app && npx expo start"

echo.
echo All services started!
echo Admin Panel: http://localhost:5173
echo Backend API: http://localhost:5000
echo.
pause
