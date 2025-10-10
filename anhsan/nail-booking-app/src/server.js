const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const bookingRoutes = require('./routes/booking');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/booking', bookingRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});