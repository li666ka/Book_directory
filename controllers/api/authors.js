const Utils = require("../../utils/utils");
const Author = require("../../models/author");

async function addAuthor(req, res) {
    console.log(req.body);

    const name = req.body.name;
    const dateBirth = req.body.birth_date;
    const dateDeath = req.body.birth_date;
    const infoUrl = Utils.createAuthorInfoUrl(name, req.body.info);

    await infoUrl;

    await Author.addAuthor(name, dateBirth, dateDeath, infoUrl);

    res.json({result: `Author ${req.body.name} was added successfully`});
}

async function getAuthorNames(req, res) {
    console.log(req.body);

    const names = await Author.getAuthorNames(req.body);

    res.json({ names });
}

async function getAuthorInfo(req, res) {
    console.log('params', req.params);

    try {
        const author = await Author.getAuthorById(req.params.id);

        let l = __dirname;
        l = l.slice(0, l.length - 10);
        const newUrl = require('path').normalize(l + author.info_url);

        res.sendFile(newUrl);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { addAuthor, getAuthorNames, getAuthorInfo };
