@echo off
echo 🚀 Khởi động server cho Nail Luxury Spa...
echo.

REM Thử chạy bằng PowerShell
echo 🌐 Khởi động server HTTP bằng PowerShell...
echo.

REM Tạo script PowerShell tạm thời
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

REM Chạy PowerShell script
powershell -ExecutionPolicy Bypass -File temp_server.ps1

REM Xóa file tạm
del temp_server.ps1

echo.
echo 👋 Tạm biệt!
pause
