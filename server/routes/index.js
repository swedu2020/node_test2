const express = require('express');
const User = require('../models/user');
const router = express.Router();
const sequelize = require("sequelize");
const Op = sequelize.Op;
router.route('/users')
    .get(async (req, res, next) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (err) {
            console.error(err);
        next(err);
    }
});
router.route('/users/:nick')
    .get(async (req, res, next) => {
        try {
            let searchWord = req.params.nick;
            console.log(searchWord);
            const users = await User.findAll({
                model: User,
                where: {
                    nick: {
                        [Op.like]: '%'+searchWord+'%'
                    }
                }
            });
            res.json(users);
        } catch (err) {
            console.error(err);
            next(err);
        }
});
module.exports = router;