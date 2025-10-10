#!/usr/bin/env python3
"""
Simple HTTP server để chạy trang web nail_full_booking.html
Giải quyết vấn đề CORS khi mở file HTML trực tiếp
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Cấu hình
PORT = 8000
DIRECTORY = Path(__file__).parent

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Thêm CORS headers để EmailJS hoạt động
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def main():
    # Kiểm tra file tồn tại
    html_file = DIRECTORY / "nail_full_booking.html"
    if not html_file.exists():
        print("❌ Không tìm thấy file nail_full_booking.html")
        print(f"   Đường dẫn hiện tại: {DIRECTORY}")
        return
    
    print(f"🚀 Khởi động server HTTP...")
    print(f"📁 Thư mục: {DIRECTORY}")
    print(f"🌐 Port: {PORT}")
    
    try:
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            print(f"✅ Server đã khởi động thành công!")
            print(f"🔗 URL: http://localhost:{PORT}")
            print(f"📄 Trang chính: http://localhost:{PORT}/nail_full_booking.html")
            print("\n💡 Hướng dẫn:")
            print("   - Mở trình duyệt và truy cập URL trên")
            print("   - Test form đặt lịch")
            print("   - Nhấn Ctrl+C để dừng server")
            print("\n" + "="*50)
            
            # Tự động mở trình duyệt
            try:
                webbrowser.open(f"http://localhost:{PORT}/nail_full_booking.html")
                print("🌐 Đã mở trình duyệt tự động")
            except:
                print("⚠️  Không thể mở trình duyệt tự động")
            
            print("⏳ Đang chạy server... (Nhấn Ctrl+C để dừng)")
            httpd.serve_forever()
            
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {PORT} đã được sử dụng")
            print("   Thử port khác hoặc dừng ứng dụng đang chạy")
        else:
            print(f"❌ Lỗi khởi động server: {e}")
    except KeyboardInterrupt:
        print("\n🛑 Server đã dừng")

if __name__ == "__main__":
    main()
