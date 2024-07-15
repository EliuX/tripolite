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
In order to solve the [excercise instruction](instructions.md) certain considerations had to be made:
- The data will be loaded in the server's database using migrations. They have to be executed as part of the 
installation process.
- Due to the volume of data of the travel routes, they are loaded all at once from the server, without doing pagination
- Having into account that it has to find all possible connections of them in between these two cities in a scalable way:
  * The search should be done in server and the presentation in the client. 
  * The MongoDB queries for the search should use a filter criteria whether possible.
- Every npm script run in the root folder is meant to spread it to all active projects, e.g. `npm test` will execute
  the tests in all projects.
- It will use a graph traversal algorithm called [Depth-First Search (DFS)](https://www.youtube.com/watch?v=x6iO0ZH9h7Q) 
  to find all paths from the origin city to the destination city. Instead of implementing this algorithm or adding an 
  external library, its code was generated using ChatGPT 4 and tested to verifying it was well functioning. 

# Disclaimer
The domain tripolite.com has not be claimed at the moment of the creation of this project.
