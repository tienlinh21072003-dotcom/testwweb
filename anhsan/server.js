const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Email configuration
const createTransporter = () => {
    return nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD
        }
    });
};

// Validation functions
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePhone = (phone) => {
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    return phoneRegex.test(phone);
};

// API Routes
app.post('/api/booking', async (req, res) => {
    try {
        const { fullName, phone, email, notes } = req.body;
        
        // Validation
        if (!fullName || !phone || !email) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin bắt buộc'
            });
        }
        
        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Email không hợp lệ'
            });
        }
        
        if (!validatePhone(phone)) {
            return res.status(400).json({
                success: false,
                message: 'Số điện thoại không hợp lệ'
            });
        }
        
        // Create email content
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
            subject: `[Đặt lịch mới] ${fullName} - ${phone}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(90deg, #d4af37, #ffd700, #d4af37); padding: 20px; border-radius: 10px 10px 0 0;">
                        <h2 style="color: #111; margin: 0; text-align: center;">🎨 Đặt lịch làm nail mới</h2>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
                        <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <h3 style="color: #333; margin-bottom: 20px;">📋 Thông tin khách hàng</h3>
                            
                            <div style="margin-bottom: 15px;">
                                <strong style="color: #d4af37;">👤 Họ và tên:</strong>
                                <span style="margin-left: 10px; color: #333;">${fullName}</span>
                            </div>
                            
                            <div style="margin-bottom: 15px;">
                                <strong style="color: #d4af37;">📱 Số điện thoại:</strong>
                                <span style="margin-left: 10px; color: #333;">${phone}</span>
                            </div>
                            
                            <div style="margin-bottom: 15px;">
                                <strong style="color: #d4af37;">📧 Email:</strong>
                                <span style="margin-left: 10px; color: #333;">${email}</span>
                            </div>
                            
                            ${notes ? `
                            <div style="margin-bottom: 15px;">
                                <strong style="color: #d4af37;">📝 Ghi chú:</strong>
                                <div style="margin-top: 8px; padding: 10px; background: #f8f9fa; border-left: 3px solid #d4af37; border-radius: 4px;">
                                    ${notes}
                                </div>
                            </div>
                            ` : ''}
                            
                            <div style="margin-top: 25px; padding: 15px; background: #e8f5e8; border-radius: 6px; border-left: 4px solid #2ed573;">
                                <strong style="color: #2ed573;">⏰ Thời gian đặt lịch:</strong>
                                <span style="margin-left: 10px; color: #333;">${new Date().toLocaleString('vi-VN')}</span>
                            </div>
                            
                            <div style="margin-top: 20px; text-align: center;">
                                <a href="tel:${phone}" style="background: #d4af37; color: #111; padding: 10px 20px; text-decoration: none; border-radius: 25px; font-weight: bold; margin-right: 10px;">
                                    📞 Gọi ngay
                                </a>
                                <a href="mailto:${email}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                                    ✉️ Gửi email
                                </a>
                            </div>
                        </div>
                        
                        <div style="margin-top: 20px; text-align: center; color: #666; font-size: 14px;">
                            <p>Email tự động từ hệ thống Nail Luxury Spa</p>
                            <p>Vui lòng liên hệ lại khách hàng trong vòng 24h</p>
                        </div>
                    </div>
                </div>
            `
        };
        
        // Send email
        const transporter = createTransporter();
        await transporter.sendMail(mailOptions);
        
        // Log booking to console
        console.log('📅 New booking received:', {
            fullName,
            phone,
            email,
            notes: notes || 'Không có ghi chú',
            timestamp: new Date().toISOString()
        });
        
        res.json({
            success: true,
            message: 'Đặt lịch thành công! Chúng tôi sẽ liên hệ lại với bạn sớm nhất.'
        });
        
    } catch (error) {
        console.error('❌ Error processing booking:', error);
        
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại sau.'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'Nail Luxury Spa Booking API'
    });
});

// Serve booking form
app.get('/booking', (req, res) => {
    res.sendFile(path.join(__dirname, 'booking.html'));
});

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('🚨 Server Error:', err);
    res.status(500).json({
        success: false,
        message: 'Lỗi máy chủ nội bộ'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Không tìm thấy trang'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
🚀 Nail Luxury Spa Booking Server đã khởi động!
📍 Port: ${PORT}
🌐 URL: http://localhost:${PORT}
📧 Email: ${process.env.GMAIL_USER}
👤 Admin: ${process.env.ADMIN_EMAIL || process.env.GMAIL_USER}
📅 Health check: http://localhost:${PORT}/api/health
    `);
});

module.exports = app;
