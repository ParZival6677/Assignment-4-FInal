// middlewares/userAuth.js
const express = require("express");
const db = require("../models");
const User = db.users;

const saveUser = async (req, res, next) => {
    try {
        const username = await User.findOne({ userName: req.body.userName });
        if (username) {
            return res.status(409).json({ error: "Username already taken" });
        }

        const emailcheck = await User.findOne({ email: req.body.email });
        if (emailcheck) {
            return res.status(409).json({ error: "Authentication failed" });
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    saveUser,
};
