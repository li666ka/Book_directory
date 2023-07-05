import {BookRepository} from "./models/book.model";

function service(title: string) {
    const start = Date.now();
    BookRepository.get().then(r => {
        const rex = new RegExp(`${title}`);
        const res = r.find(el => el.title.search(rex));
        const millis = Date.now() - start;
        console.log(`(service) ${millis}`);
        // @ts-ignore
        console.log(res.title);
        return res;
    })
}

service('The Green Mile');

const start = Date.now();
BookRepository.get('The Green Mile').then(r => {
    const millis = Date.now() - start;
    console.log(`(db) ${millis}`);
    console.log(r[0].title);
    return;
})