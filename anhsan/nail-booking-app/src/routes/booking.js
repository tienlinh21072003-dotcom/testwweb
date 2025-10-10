const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', async (req, res) => {
    const { name, phone, email, notes } = req.body;

    // Validate input
    const phoneRegex = /^[0-9]{10,11}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !phone || !email) {
        return res.status(400).json({ message: 'Họ tên, Số điện thoại và Email là bắt buộc.' });
    }
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: 'Số điện thoại không hợp lệ.' });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Email không hợp lệ.' });
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Booking Request',
        text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nNotes: ${notes || 'None'}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Đặt lịch thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Gửi thất bại, vui lòng thử lại.' });
    }
});

module.exports = router;