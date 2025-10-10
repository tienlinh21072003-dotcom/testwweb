# 🎨 Nail Luxury Spa - Hệ thống đặt lịch

Hệ thống đặt lịch làm nail với form validation, gửi email thông báo tự động đến admin.

## ✨ Tính năng

- ✅ Form đặt lịch với validation real-time
- ✅ Kiểm tra hợp lệ số điện thoại Việt Nam
- ✅ Kiểm tra định dạng email
- ✅ Gửi email thông báo đẹp đến admin
- ✅ Responsive design cho mobile
- ✅ Loading state và feedback cho user
- ✅ API endpoints cho health check

## 🚀 Hướng dẫn cài đặt

### Bước 1: Cài đặt Node.js
- Tải và cài đặt Node.js từ [nodejs.org](https://nodejs.org/) (phiên bản 14+)
- Kiểm tra cài đặt: `node --version` và `npm --version`

### Bước 2: Clone/Download project
```bash
# Nếu có git
git clone <repository-url>
cd nail-luxury-spa-booking

# Hoặc download và giải nén file ZIP
```

### Bước 3: Cài đặt dependencies
```bash
npm install
```

### Bước 4: Cấu hình Gmail App Password

#### 4.1. Bật 2-Factor Authentication
1. Đăng nhập Gmail
2. Vào **Quản lý tài khoản Google** → **Bảo mật**
3. Bật **Xác minh 2 bước**

#### 4.2. Tạo App Password
1. Trong phần **Bảo mật**, tìm **Mật khẩu ứng dụng**
2. Chọn ứng dụng: **Thư** (Mail)
3. Chọn thiết bị: **Máy tính Windows** (hoặc Mac/Other)
4. Nhấn **Tạo**
5. **SAO CHÉP** mật khẩu 16 ký tự (VD: `abcd efgh ijkl mnop`)

### Bước 5: Cấu hình file .env
1. Copy file `env.example` thành `.env`
2. Điền thông tin:

```env
# Gmail của bạn
GMAIL_USER=your-email@gmail.com

# App Password (16 ký tự, KHÔNG có dấu cách)
GMAIL_APP_PASSWORD=abcdefghijklmnop

# Email admin nhận thông báo (có thể khác Gmail trên)
ADMIN_EMAIL=admin@yourdomain.com

# Port server
PORT=3000
```

### Bước 6: Chạy server
```bash
# Chế độ production
npm start

# Chế độ development (tự động restart khi code thay đổi)
npm run dev
```

### Bước 7: Kiểm tra
- Mở trình duyệt: `http://localhost:3000`
- Test form đặt lịch: `http://localhost:3000/booking`
- Health check: `http://localhost:3000/api/health`

## 📁 Cấu trúc project

```
nail-luxury-spa-booking/
├── booking.html          # Form đặt lịch
├── server.js            # Server Node.js + Express
├── package.json         # Dependencies và scripts
├── env.example          # Template file cấu hình
├── README.md           # Hướng dẫn này
└── .env                # File cấu hình (tạo từ env.example)
```

## 🔧 API Endpoints

### POST /api/booking
Đặt lịch làm nail

**Request Body:**
```json
{
  "fullName": "Nguyễn Văn A",
  "phone": "0901234567",
  "email": "nguyenvana@gmail.com",
  "notes": "Muốn làm nail gel màu hồng"
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Đặt lịch thành công! Chúng tôi sẽ liên hệ lại với bạn sớm nhất."
}
```

### GET /api/health
Kiểm tra trạng thái server

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-01-27T10:30:00.000Z",
  "service": "Nail Luxury Spa Booking API"
}
```

## 🎨 Customization

### Thay đổi thông tin spa
Chỉnh sửa trong file `booking.html`:
- Tên spa trong `<title>` và `<h1>`
- Thông tin liên hệ
- Màu sắc trong CSS variables

### Thay đổi template email
Chỉnh sửa phần `html` trong `mailOptions` của file `server.js`

### Thêm validation
Thêm rules mới trong các function `validate*()` của file `server.js`

## 🐛 Troubleshooting

### Lỗi "Invalid login"
- ✅ Kiểm tra Gmail App Password (16 ký tự, không có dấu cách)
- ✅ Đã bật 2-Factor Authentication
- ✅ Tài khoản Gmail chính xác

### Lỗi "Connection refused"
- ✅ Kiểm tra port 3000 có bị chiếm không: `netstat -an | findstr :3000`
- ✅ Thay đổi PORT trong file .env

### Không nhận được email
- ✅ Kiểm tra spam/junk folder
- ✅ Kiểm tra ADMIN_EMAIL trong .env
- ✅ Kiểm tra console log của server

### Form không submit được
- ✅ Mở Developer Tools (F12) → Console để xem lỗi
- ✅ Kiểm tra server có chạy không
- ✅ Kiểm tra network tab khi submit

## 📞 Support

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra console log của server
2. Kiểm tra browser console (F12)
3. Đảm bảo đã cấu hình đúng .env
4. Test API bằng Postman hoặc curl

## 📄 License

MIT License - Sử dụng tự do cho dự án thương mại.
