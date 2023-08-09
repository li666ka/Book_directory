# Booklist

## About

## Technology Stack
 - Node.js
 - Typescript
 - MySQL
 - Docker

## Docker Compose
```
 > docker-compose up -d 
```
You can change environment variables in `.env` file.

## API

### General

### Authors

`GET /authors` - returns all authors <br />
`GET /authors/:id` - returns author <br />
`POST /authors/` - creates author <br />
`POST /authors/:id/image` - uploads author image <br />
`PUT /authors/:id` - updates author <br />
`DELETE /authors/:id` - deletes author <br />

### Books

`GET /books` - returns all books <br />
`GET /books/:id` - returns book <br />
`POST /books/` - creates book <br />
`POST /books/:id/image` - uploads book image <br />
`POST /books/:id/file` - uploads book file <br />
`PUT /books/:id` - updates book <br />
`DELETE /books/:id` - deletes book <br />

### Genres

`GET /genres` - returns all genres <br />
`GET /genres/:id` - returns genre <br />
`POST /genres/` - creates genre <br />
`PUT /genres/:id` - updates genre <br />
`DELETE /genres/:id` - deletes genre <br />

### Statuses

`GET /statuses` - returns all statuses <br />
`GET /statuses/:id` - returns status  <br />
`POST /statuses` - creates status <br />
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
`GET /users/:userId` - returns user <br />
`POST /users/signup` - creates user <br />
`POST /users/signup/moderator` - creates moderator <br />
`POST /users/signup/admin` - creates administrator <br />
`POST /users/signin` - returns JWT <br />
`PUT /users/:userId` - updates user <br />
`PATCH /users/:userId/role` - update user role <br />
`DELETE /users/:userId` - deletes user <br />

`POST /users/:userId/books/:bookId` - adds book to user's booklist <br />
`PUT /users/:userId/books/:bookId` - updates booklist item <br />
`DELETE /users/:userId/books/:bookId` - removes item from booklist <br />

### Reviews

`GET /reviews` - returns all reviews <br />
`GET /reviews/:userId/:bookId` - returns book review <br />
`POST /reviews/:userId/:bookId` - creates book review <br />
`PUT /reviews/:userId/:bookId` - updates book review <br />
`DELETE /reviews/:userId/:bookId` - deletes book review <br />

### Details

