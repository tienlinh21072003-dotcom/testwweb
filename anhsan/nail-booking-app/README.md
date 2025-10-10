# Nail Booking App

## Setup Instructions

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file based on `.env.example` and add your Gmail credentials:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```
4. Start the server with `npm start`.
5. Open `public/index.html` in your browser to access the booking form.

## Project Structure

```
nail-booking-app
├── src
│   ├── server.js          # Entry point of the Node.js application
│   └── routes
│       └── booking.js     # Route for handling booking form submissions
├── public
│   ├── index.html         # HTML structure for the booking form
│   └── script.js          # Client-side JavaScript for form submission
├── .env.example            # Template for environment variables
├── package.json            # Configuration file for npm
└── README.md               # Documentation for the project
```

## Usage

- The application allows users to submit a booking form with their name, phone number, email, and optional notes.
- Upon submission, the server validates the input and sends an email to the admin with the booking details using Nodemailer.
- Users receive feedback on the success or failure of their submission.

## Dependencies

- **Express**: Web framework for Node.js.
- **Nodemailer**: Module for sending emails.
- **dotenv**: Module for loading environment variables from a `.env` file.