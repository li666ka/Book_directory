import Utils from '../../utils/utils';
import Author from '../../models/author';

async function addAuthor(req: any, res: any) {
    console.log(req.body);

    const name = req.body.name;
    const dateBirth = req.body.birth_date;
    const dateDeath = req.body.birth_date;
    const infoUrl = Utils.createAuthorInfoUrl(name, req.body.info);

    await infoUrl;

    await Author.addAuthor(name, dateBirth, dateDeath, infoUrl);

    res.json({result: `Author ${req.body.name} was added successfully`});
}

async function getAuthorNames(req: any, res: any) {
    console.log(req.body);

    const names = await Author.getAuthorNames();

    res.json({ names });
}

async function getAuthorInfo(req: any, res: any) {
    console.log('params', req.params);

    try {
        const author = await Author.getAuthorById(req.params.id);
        const root = Utils.getFileRoot(author.info_url);
        res.sendFile(root);
    } catch (err) {
        console.log(err);
    }
}

export default { addAuthor, getAuthorNames, getAuthorInfo };
