# Booklist

## About

## MySQL Database

### Installation

1. Open your cmd and input next commands:

    ```
    > docker pull mysql
    ```
    ```
    > docker run --name <container-name> -p 8080:3306 -e MYSQL_ROOT_PASSWORD=<password> -d mysql
    ```

2. Run new container *book_directory* in Docker.

## API

### General

### Authors

`GET /authors` - returns all authors <br />
`GET /authors/:id` - returns author <br />
`POST /authors/` - creates author <br />
`PUT /authors/:id` - updates author <br />
`DELETE /authors/:id` - deletes author <br />

`GET /authors/:id/books` - returns author's books <br />

### Books

`GET /books` - returns all books <br />
`GET /books/:id` - returns book <br />
`POST /books/` - creates book <br />
`PUT /books/:id` - updates book <br />
`DELETE /books/:id` - deletes book <br />

`GET /books/:id/author` - returns book's author <br />
`GET /books/:bookId/genres` - returns book's genres <br />
`PUT /books/:bookId/genres/:genreId` - adds genre to book <br />
`DELETE /books/:bookId/genres/:genreId` - removes genre from book <br />

`GET /books/:id/reviews` - returns book reviews <br />

### Genres

`GET /genres` - returns all genres <br />
`GET /genres/:id` - returns genre <br />
`POST /genres/` - creates genre <br />
`PUT /genres/:id` - updates genre <br />
`DELETE /genres/:id` - deletes genre <br />

### Statuses

`GET /statuses` - returns all statuses <br />
`GET /statuses/:id` - returns status  <br />
`POST /statuses/` - creates status <br />
`PUT /statuses/:id` - updates status <br />
`DELETE /statuses/:id` - deletes status <br />

### Roles

`GET /roles` - returns all roles <br />
`GET /roles/:id` - returns role  <br />
`POST /roles/` - creates role <br />
`PUT /roles/:id` - updates role  <br />
`DELETE /roles/:id` - deletes role  <br />

### Users

`GET /users` - returns all users <br />
`GET /users/:id` - returns user <br />
`POST /users/signup` - creates user <br />
`POST /users/signin` - returns JWT <br />
`PUT /users/:id` - updates user <br />
`DELETE /users/:id` - deletes user <br />

`GET /users/:id/books` - returns user's booklist <br />
`GET /users/:userId/books/:bookId` - returns user's booklist item <br />
`GET /users/:userId/books/:bookId/status` - returns booklist item's status <br />
`POST /users/:userId/books/:bookId` - adds book to user's booklist <br />
`PUT /users/:userId/books/:bookId` - updates booklist item <br />
`DELETE /users/:userId/books/:bookId` - removes item from booklist <br />

`GET /users/:userId/books/:bookId/review` - returns book review <br />
`POST /users/:userId/books/:bookId/review` - creates book review <br />
`PUT /users/:userId/books/:bookId/review` - updates book review <br />
`DELETE /users/:userId/books/:bookId/review` - deletes book review <br />

### Book Reviews

`GET /reviews/` - returns all reviews <br />

### Details

