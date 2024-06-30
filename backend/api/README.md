Tripolite's API
=================

API in the backend of the Tripolite project

## Dependencies
In addition to the common [resources of Tripolite](../../common/README.md), this project includes:

- Express
- Mikro-ORM + Migrations
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
  Check with `npx mikro-orm-esm debug` that everything is Ok.
- Seed the database:
  ```shell
    npm run seed
  ```
