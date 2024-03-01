// middlewares/authorization.js
const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next();
        } else {
            return res.status(403).json({ error: 'Unauthorized' });
        }
    };
};

module.exports = {
    checkRole,
};
