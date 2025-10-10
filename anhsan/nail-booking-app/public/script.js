document.getElementById('bookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const responseMessage = document.getElementById('responseMessage');

    // Validate phone number and email format
    const phoneRegex = /^[0-9]{10,11}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!phoneRegex.test(data.phone)) {
        responseMessage.textContent = 'Số điện thoại không hợp lệ.';
        return;
    }

    if (!emailRegex.test(data.email)) {
        responseMessage.textContent = 'Email không hợp lệ.';
        return;
    }

    try {
        const response = await fetch('/api/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        responseMessage.textContent = result.message;
    } catch (error) {
        responseMessage.textContent = 'Có lỗi xảy ra. Vui lòng thử lại.';
    }
});