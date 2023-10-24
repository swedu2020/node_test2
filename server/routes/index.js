const express = require('express');
const router = express.Router();
router.route('/')
    .get(async (req, res, next) => {
        try {
            res.json({'index':[1,2,3,4,5]});
        } catch (err) {
        console.error(err);
        next(err);
    }
});
router.route('/users')
    .get(async (req, res, next) => {
        try {
            res.json({'users': ['kim', 'lee', 'hong', 'park', 'cho']});
        } catch (err) {
            console.error(err);
        next(err);
    }
});
module.exports = router;