Tripolite's API
=================

API in the backend of the Tripolite project

## Dependencies
In addition to the common [resources of Tripolite](../../common/README.md), this project includes:

- Express
- TypeORM + Migrations
- MongoDB


## How to start
These are the steps to make the API available
- Firstly, install the dependencies with `npm install`. This will also build the `common` module.
- Start the mongodb server:
    ```shell
    docker-compose up --build
    ```
- If you have not created the database yet, you can:
  ```shell
    npx mikro-orm database:create 
  ```
- Run the migrations the database:
  ```shell
    npm run migrate:up
  ```
- Start the application
   ```shell
    npm start
  ``` 
  
## Well known issues

- It is unknown the reasons why the extension of the imported entities are requested to be included
  at the end during the importing process and only .js was allowed.

