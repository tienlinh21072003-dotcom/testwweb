@echo off
echo 🚀 Khởi động server cho Nail Luxury Spa...
echo.

echo 💡 Chọn cách chạy server:
echo.
echo 1. Node.js (nếu đã cài đặt)
echo 2. PowerShell (có sẵn trên Windows)
echo 3. Hướng dẫn cài đặt
echo.

set /p choice="Nhập lựa chọn (1-3): "

if "%choice%"=="1" goto nodejs
if "%choice%"=="2" goto powershell
if "%choice%"=="3" goto install
goto invalid

:nodejs
echo.
echo 🌐 Khởi động bằng Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js chưa được cài đặt
    goto install
)
npx http-server -p 8000 -c-1 --cors
goto end

:powershell
echo.
echo 🌐 Khởi động bằng PowerShell...
echo # Simple HTTP Server > temp_server.ps1
echo $port = 8000 >> temp_server.ps1
echo $path = Get-Location >> temp_server.ps1
echo $listener = New-Object System.Net.HttpListener >> temp_server.ps1
echo $listener.Prefixes.Add("http://localhost:$port/") >> temp_server.ps1
echo $listener.Start() >> temp_server.ps1
echo Write-Host "✅ Server đã khởi động tại http://localhost:$port" >> temp_server.ps1
echo Write-Host "📄 Trang chính: http://localhost:$port/nail_full_booking.html" >> temp_server.ps1
echo Write-Host "⏳ Đang chạy... (Nhấn Ctrl+C để dừng)" >> temp_server.ps1
echo while ($listener.IsListening) { >> temp_server.ps1
echo     $context = $listener.GetContext() >> temp_server.ps1
echo     $request = $context.Request >> temp_server.ps1
echo     $response = $context.Response >> temp_server.ps1
echo     $localPath = $request.Url.LocalPath >> temp_server.ps1
echo     if ($localPath -eq "/") { $localPath = "/nail_full_booking.html" } >> temp_server.ps1
echo     $filePath = Join-Path $path $localPath.TrimStart('/') >> temp_server.ps1
echo     if (Test-Path $filePath) { >> temp_server.ps1
echo         $content = [System.IO.File]::ReadAllBytes($filePath) >> temp_server.ps1
echo         $response.ContentLength64 = $content.Length >> temp_server.ps1
echo         $response.OutputStream.Write($content, 0, $content.Length) >> temp_server.ps1
echo         $response.AddHeader("Access-Control-Allow-Origin", "*") >> temp_server.ps1
echo     } else { >> temp_server.ps1
echo         $response.StatusCode = 404 >> temp_server.ps1
echo     } >> temp_server.ps1
echo     $response.OutputStream.Close() >> temp_server.ps1
echo } >> temp_server.ps1
powershell -ExecutionPolicy Bypass -File temp_server.ps1
del temp_server.ps1
goto end

:install
echo.
echo 📥 Hướng dẫn cài đặt:
echo.
echo 🟢 Node.js (Khuyến nghị):
echo    1. Truy cập: https://nodejs.org/
echo    2. Tải phiên bản LTS
echo    3. Cài đặt với tùy chọn mặc định
echo    4. Restart máy tính
echo    5. Chạy lại file này
echo.
echo 🟡 Hoặc sử dụng PowerShell (có sẵn):
echo    Chọn option 2 ở trên
echo.
pause
goto end

:invalid
echo ❌ Lựa chọn không hợp lệ
pause
goto end

:end
echo.
echo 👋 Tạm biệt!
pause
