@echo off
echo 🚀 Khởi động server cho Nail Luxury Spa...
echo.

REM Kiểm tra Python có cài đặt không
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python chưa được cài đặt hoặc không có trong PATH
    echo.
    echo 💡 Hướng dẫn cài đặt Python:
    echo    1. Tải Python từ: https://python.org/downloads
    echo    2. Cài đặt với "Add Python to PATH" được chọn
    echo    3. Chạy lại file này
    echo.
    pause
    exit /b 1
)

echo ✅ Python đã được cài đặt
echo 🌐 Khởi động server HTTP...
echo.

REM Chạy server Python
python simple-server.py

echo.
echo 👋 Tạm biệt!
pause
