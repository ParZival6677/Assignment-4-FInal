// controllers/userController.js
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

const User = db.users;

const signup = async (req, res) => {
    try {
        const { userName, email, password, firstName, lastName, age, country, gender } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const usernameExists = await User.findOne({ userName });
        const emailExists = await User.findOne({ email });

        if (usernameExists) {
            return res.status(409).json({ error: 'Username already taken' });
        }

        if (emailExists) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const user = await User.create({
            userName,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            age,
            country,
            gender,
            role: 'user' 
        });

        if (user) {
            let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);

            // Send a welcome email
            await sendWelcomeEmail(user.email, user.userName);

            return res.status(201).json({ message: 'User registered successfully' });
        } else {
            return res.status(409).json({ error: 'Registration failed' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            const isSame = await bcrypt.compare(password, user.password);

            if (isSame) {
                let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });

                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

                console.log("Login successful for user:", user.email);
                return res.status(200).json({ message: "Login successful", user });
            } else {
                return res.status(401).json({ error: "Authentication failed" });
            }
        } else {
            return res.status(401).json({ error: "Authentication failed" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'grofis.togma@gmail.com', 
        pass: 'poseydo5913', 
    },
});


const sendWelcomeEmail = async (email, username) => {
    try {
        const mailOptions = {
            from: 'grofis.togma@gmail.com', 
            to: email,
            subject: 'Welcome to Your App',
            text: `Hello ${username},\n\nWelcome to Your App! We're excited to have you on board.`,
        };

        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully');
    } catch (error) {
        console.log('Error sending welcome email:', error);
    }
};

module.exports = {
    signup,
    login,
};
