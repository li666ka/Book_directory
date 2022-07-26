import {getBooks, addAuthor, getAuthorNames} from './requests.js';
import {setupAuthorsComboBox, setupBookViewer} from './html-builder.js';

export function onSearchButtonClicked() {
    const book_title = document.getElementById('book-title-field').value;
    const author_name = document.getElementById('author-name-field').value;
    getBooks(book_title, author_name)
        .then(
            response => {
                console.log(response.data.books)
                setupBookViewer(response.data.books);
            })
        .catch( error => {
            console.log(error);
        });
}

export async function onAddAuthorButtonClicked () {
    const name = document.getElementById('new-author-name').value;
    const dateBirth = document.getElementById('new-author-date-birth').value;
    const dateDeath = document.getElementById('new-author-date-death').value;
    const info = document.getElementById('new-author-info').value;

    document.getElementById('new-author-name').value = '';
    document.getElementById('new-author-date-birth').value = '';
    document.getElementById('new-author-date-death').value = '';
    document.getElementById('new-author-info').value = '';

    try {
        let response = await addAuthor(name, dateBirth, dateDeath, info);
        console.log(response.data.result);

        response = await getAuthorNames();
        console.log(response.data.names);

        setupAuthorsComboBox(response.data.names);
    } catch (err) {
        console.log(err);
    }

}
