// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// In-memory user database (replace with real database in production)
const users = {
    'aryan': {
        password: 'Abcd@1234',
        email: 'aryan@example.com',
        otp: null
    }
};

// Function to generate a random OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

app.post('/send-otp', (req, res) => {
    const { email } = req.body;
    
    // Find user by email (assuming email is unique)
    const user = Object.values(users).find(user => user.email === email);

    if (user) {
        user.otp = generateOTP();
        console.log(`OTP for ${email}: ${user.otp}`); // Simulate sending OTP
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    
    // Find user by email
    const user = Object.values(users).find(user => user.email === email);

    if (user && user.otp === otp) {
        user.otp = null; // Clear OTP after successful verification
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    const user = users[username];

    if (user && user.password === password) {
        res.json({ success: true, email: user.email });
    } else {
        res.json({ success: false });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
