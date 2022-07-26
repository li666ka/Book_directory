# book-directory

In this project I`m using MySql db. You need install Docker for local running database. So here are steps:

1. Open your cmd and input next commands:

    ```
    > docker pull mysql
    ```
    ```
    > docker run --name book_dictory -p 8080:3306 -e MYSQL_ROOT_PASSWORD=0000 -d mysql
    ```

2. Then run new containers *book_directory* in Docker.

Run the app and go to localhost:8888
