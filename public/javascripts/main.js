import {getAuthorNames, getBooks} from './requests.js';
import {
    onSearchButtonClicked,
    onAddBookButtonClicked,
    onAddAuthorButtonClicked
} from './handlers.js';
import {setupAuthorsComboBox, setupBookViewer} from './html-builder.js';

getBooks('', '')
    .then(
        response => {
            console.log(response.data.books);
            setupBookViewer(response.data.books);
        })
    .catch( error => {
        console.log(error);
    });

getAuthorNames()
    .then(
        response => {
            console.log(response.data.names);
            setupAuthorsComboBox(response.data.names);
        })
    .catch( error => {
        console.log(error);
    });

// handlers of buttons setup
document.getElementById('search-button').onclick = onSearchButtonClicked;
document.getElementById('add-book-button').onclick = onAddBookButtonClicked;
document.getElementById('add-author-button').onclick = onAddAuthorButtonClicked;

