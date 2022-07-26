const { Router } = require('express');
const Author = require("../../models/author");
const Utils = require('../../utils/utils');

const router = Router();

/* Add author */
router.post('/addAuthor', async (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const dateBirth = req.body.birth_date;
    const dateDeath = req.body.birth_date;
    const infoUrl = await Utils.createAuthorInfoUrl(name, req.body.info);

    Author.addAuthor(name, dateBirth, dateDeath, infoUrl).then(r => {
        res.json({result: `Author ${req.body.name} was added successfully`});
    });

});

/* GET authors names */
router.get('/names', (req, res) => {
    console.log(req.body);
    Author.getAuthorNames(req.body).then(names => {
        res.json({ names });
    });
});

/* GET author info */
router.get('/:id', (req, res, next) => {
    console.log('params', req.params);
    Author.getAuthorById(req.params.id)
        .then(auhtor => {
            let l = __dirname;
            l = l.slice(0, l.length - 10);
            const newUrl = require('path').normalize(l + auhtor.info_url);
            res.sendFile(newUrl);
        })
        .catch(err => console.log(err));
});

module.exports = router;
