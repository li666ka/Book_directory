export function setupBookViewer(books) {
    let html = '';
    books.forEach(elem => {
        html += `<div>
                    <div>
                        <h3><a href="http://localhost:8888/api/books/${elem.id}">${elem.title}</a></h3>
                        <p><a href="http://localhost:8888/api/authors/${elem.author_id}">${elem.author_name}</a></p>
                    <\div>
                    <h4>Description</h4>
                    <div><p>${elem.description_url}</p><\div>
                <\div>`;
    });
    document.getElementById('books-viewer').innerHTML = html;
}

export function setupAuthorsComboBox(names) {
    let html = '';
    names.forEach(elem => {
        html += `<option>${elem.name}</option>`;
    });
    document.getElementById('authors-combobox').innerHTML = html;
}