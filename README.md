Tripolite
=====================
Monorepo for the Truxweb Coding Test. This project intends to demo my full stack skills around 
[TypeScript](https://www.typescriptlang.org/), following the [provided intructions](instructions.md).

## Dependencies
Be sure to have installed in your system:

- docker
- docker-compose
- NodeJS
- TypeScript


## Structure
The following folder structure was conceived for making this project easier to manage and scalable if necessary. Each of
these projects has its own documentation for more details.

- [/Frontend/website](/frontend/website/README.md):  The only frontend project available.
- [/Backend/api](/backend/api/README.md): The only backend project available.
- [/Common](/common/README.md): The project with the contracts between the frontend and the backend.

## How to demo
This is how you should try the application:

- We must get ready the backend. Follow [these instructions](./backend/api/README.md).
- Next, we must get ready the frontend. Follow [these instructions](./frontend/website/README.md).
- Open the web application in your browser and start using it: http://localhost:3000/


## Considerations
### Considerations

In order to address the [exercise instruction](instructions.md), several key considerations were made:

- **Data Loading and Migrations**:
  - The data will be populated in the server's database through migrations, which must be executed as part of the installation process.

- **Data Volume and Pagination**:
  - Given the large volume of travel route data, it will be loaded all at once from the server without pagination.

- **Scalable Search Solution**:
  - To ensure scalability in finding all possible connections between two cities:
    - The search process will be handled server-side, while the presentation will be managed client-side.
    - MongoDB queries for the search will apply filter criteria wherever possible.

- **NPM Script Execution**:
  - Every npm script executed in the root folder is intended to propagate across all active projects. For instance, `npm test` will run tests in all projects.

- **Graph Traversal Algorithm**:
  - A graph traversal algorithm, specifically [Depth-First Search (DFS)](https://www.youtube.com/watch?v=x6iO0ZH9h7Q), will be used to find all paths from the origin city to the destination city.
  - There is potential for performance improvements by caching Travel Choices in the MongoDB database.

- **User Interface Enhancements**:
  - When users encounter *TBD* in the UI, a tooltip will provide additional context.
  - For travel routes, the company providing the trip will have a contact link for user convenience.

# Disclaimer
The domain tripolite.com has not be claimed at the moment of the creation of this project.
