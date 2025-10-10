@echo off
title Nail Luxury Spa Server
color 0A
echo.
echo ========================================
echo    NAIL LUXURY SPA - BOOKING SERVER
echo ========================================
echo.
echo 🌐 Khởi động server HTTP...
echo 📁 Thư mục: %CD%
echo.

REM Thử PowerShell trước
echo 🔧 Đang khởi động bằng PowerShell...
echo.

REM Tạo script PowerShell đơn giản
(
echo # Simple HTTP Server
echo $port = 8000
echo $path = Get-Location
echo $listener = New-Object System.Net.HttpListener
echo $listener.Prefixes.Add("http://localhost:$port/"^)
echo $listener.Start(^)
echo Write-Host "✅ Server đã khởi động tại http://localhost:$port" -ForegroundColor Green
echo Write-Host "📄 Trang chính: http://localhost:$port/nail_full_booking.html" -ForegroundColor Yellow
echo Write-Host "⏳ Đang chạy... (Nhấn Ctrl+C để dừng)" -ForegroundColor Cyan
echo Write-Host ""
echo while ($listener.IsListening^) {
echo     try {
echo         $context = $listener.GetContext(^)
echo         $request = $context.Request
echo         $response = $context.Response
echo         $localPath = $request.Url.LocalPath
echo         if ($localPath -eq "/"^) { $localPath = "/nail_full_booking.html" }
echo         $filePath = Join-Path $path $localPath.TrimStart('/'^)
echo         if (Test-Path $filePath^) {
echo             $content = [System.IO.File]::ReadAllBytes($filePath^)
echo             $response.ContentLength64 = $content.Length
echo             $response.OutputStream.Write($content, 0, $content.Length^)
echo             $response.AddHeader("Access-Control-Allow-Origin", "*"^)
echo         } else {
echo             $response.StatusCode = 404
echo         }
echo         $response.OutputStream.Close(^)
echo     } catch {
echo         break
echo     }
echo }
echo $listener.Stop(^)
) > server.ps1

REM Chạy PowerShell script
powershell -ExecutionPolicy Bypass -File server.ps1

REM Xóa file tạm
del server.ps1 2>nul

echo.
echo 👋 Server đã dừng
pause
