const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.route('/users')
    .get(async (req, res, next) => {
        try {
            const users = await User.findAll();
            console.log('User.findAll : ', users);
            res.json(users);
        } catch (err) {
            console.error(err);
        next(err);
    }
});
module.exports = router;