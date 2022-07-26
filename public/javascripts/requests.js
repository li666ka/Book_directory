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

export async function addBook(data) {
    // if (name === '') {
    //     return;
    // }
    //
    // if (dateBirth === '') {
    //     return;
    // }

    const params = {
        name: name,
        birth_date: dateBirth,
        death_date: dateDeath,
        info: info
    }

    return await axios.post('/api/authors/addAuthor', params);
}

export async function getAuthorNames() {
    return await axios.get('/api/authors/names');
}
