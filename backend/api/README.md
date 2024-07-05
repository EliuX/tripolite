Tripolite's API
=================

API in the backend of the Tripolite project

## Dependencies
In addition to the common [resources of Tripolite](../../common/README.md), this project includes:

- Express
- TypeORM + Migrations
- MongoDB
- ESLint (Typescript linter)


## How to start
These are the steps to make the API available:
- Firstly, install the dependencies with `npm install`. This will also build the `common` module.
- Execute some basic unit tests:
   ```shell
    npm test
  ```
  
- Start the mongodb server:
    ```shell
    docker-compose up --build
    ```
  
- Run the database migrations, which will seed the initial Travel Agency Data:
  ```shell
    npm run migrate:up
  ```

- Start the application, for development:
   ```shell
    npm run dev
  ```
  or for production
   ```shell
    npm start
  ```

