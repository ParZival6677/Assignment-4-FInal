// controllers/userController.js
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

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


module.exports = {
    signup,
    login,
};
