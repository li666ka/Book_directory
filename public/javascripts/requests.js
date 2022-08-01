export async function getBooks(bookTitle, authorName) {
    let params = {};

    if (bookTitle !== '') {
        params.book_title = bookTitle;
    }

    if (authorName !== '') {
        params.author_name = authorName;
    }

    return await axios.get('/api/books', { params });
}

export async function addAuthor(name, dateBirth, dateDeath, info) {
    if (name === '') {
        return;
    }

    if (dateBirth === '') {
        return;
    }

    const params = {
        name: name,
        birth_date: dateBirth,
        death_date: dateDeath,
        info: info
    }

    return await axios.post('/api/authors/addAuthor', params);
}

export async function addBook(title, authorName, desc, file) {
    // if (name === '') {
    //     return;
    // }
    //
    // if (dateBirth === '') {
    //     return;
    // }

    const data = new FormData();
    data.append(title.name, title.value);
    data.append(authorName.name, authorName.value);
    data.append(desc.name, desc.value);
    data.append(file.name, file.value);

    return await axios.post('/api/books/addBook', data);
}

export async function getAuthorNames() {
    return await axios.get('/api/authors/names');
}
