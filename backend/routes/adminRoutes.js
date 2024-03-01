// routes/adminRoutes.js
const express = require('express');
const { checkRole } = require('../middlewares/authorization');

const router = express.Router();

router.get('/admin', checkRole('admin'), (req, res) => {
    // Only admin can access this route
    res.json({ message: 'Admin route accessed successfully' });
});

module.exports = router;
