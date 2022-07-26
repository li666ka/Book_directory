const { Router } = require('express');
const { getBookById } = require("../models/book");

const router = Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('home');
});

module.exports = router;
