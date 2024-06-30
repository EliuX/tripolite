# Travel Agency

## Description

- Build the back and front ends for an application which finds paths between origin and destination selected by the user.
- The list of origins and destinations are a known list populated by the data in the CSV
- The user can select how they want to travel.
- The list of travel methods is a known list populated by the CSV.

### Functional Requirements

- Be able to select from an origin and destination from a list of known locations
- Origin and Destination are not required to be point to point, the code should be able to find any connections between the list of nodes
- Service Type should an optional search param
    - If it is provided results should _still_ be returned that use a non-preferred method of travel
    - Routes which only use the preferred mode of travel should be differentiated from those that use mixed-modes of transportopm
- The total price should be returned with the matching results (if it can be determined) and the user should be able to see the cost of each part of the route.
    - The user should also be able to see who the service provider is for each step of the route
- The application should gracefully handle when no results are returned for a request
- A user can select which of the results they want to book
- A booked trip has a status
    - If a price can be determined for the trip, the trip should be in a CONFIRMED status
    - If a price cannot be determined for the trip, the trip should be in a PENDING status
- A user can view the details of their booked trips

### Technical Requirements

- Must be written in Typescript
    - If you want to use something like Deno for the backend, thats fine just call it out in your submission
- MongoDB must be used at the data store
- You can use any NodeJS server framework for the Backend
    - Fastify is preferred, but not a requirement and you will not be docked points for using something else
- NextJS v14 must be used for the Frontend
    - Redux is strongly recommended for use as the data store in the Frontend Application, but you will not docked points for not using it
- Must use a UX library (Next UI, Tailwind, Material UI, Ant Design etc)
    - Next UI is preferred, but not a requirement and you will not be docked points for using something else
- Tooling like Eslint/Prettier is highly recommended, but is not a functional requirement
- You must provide working unit tests for at least one a route - or piece of functionality - on the backend and a unit test for a component on the front end
    - An e2e test would be accepted for the Frontend coverage (through cypress or the other E2E testing systems), but a standalone unit test for the backend system would still be required idependently.

### Deliverables

- Submission should be sent as a link to a git repo
    - leaving your commit history intact is a nice to have, but not a requirement and you will not be docked points if the repo just has a single commit
- README describing the steps required to start your application
- A script to bootstrap the datastore
- separate Frontend and Backend Applications in a single repo

### Evaluation Criteria

- Does the application meet all Technical and Function requiremnts
- How clear were the instructions provided?
- Is the code well organized?
- Is the code documented? How clear are the comments left (if any)?
- Does the code follow common best practices?
- Does it follow any coding standards?
- How easy is the code to navigate?
- How well will it scale?
    - The dataset provided obviously does not provide a challenge to work with, but some consideration should be paid to if the dataset was 100,000x larger
- Was the code easy to modify?
    - I know this is sneaky and not that clear what is being asked for, but its a bit of a real world check. Think about things such as changing what information is displayed in the UX, adding a brand new route to your server, adding new parameters to entities.
- You will not be evaluated on the nuances of the UX
    - i.e. you will not be docked points if the UX is not pixel perfect, as long as the UX library selected is used according to its guidelines.

## Data

- The schedule for each route is represented by 7 characters, representing the days of the week starting on Monday
- A price of 0 indicates that this trip does not have a price and would need to be submitted to the transporter before it can be booked, and should be displayed as `TBD` in the UX to the user
