@echo off
echo 🚀 Khởi động server cho Nail Luxury Spa...
echo.

REM Kiểm tra Node.js có cài đặt không
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js chưa được cài đặt
    echo.
    echo 💡 Hướng dẫn cài đặt Node.js:
    echo    1. Tải Node.js từ: https://nodejs.org/
    echo    2. Cài đặt với tùy chọn mặc định
    echo    3. Chạy lại file này
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js đã được cài đặt
echo 🌐 Khởi động server HTTP...
echo.

REM Chạy server Node.js
npx http-server -p 8000 -c-1 --cors

echo.
echo 👋 Tạm biệt!
pause
