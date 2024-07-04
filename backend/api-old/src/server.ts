import app from "./index";
import {AppDataSource} from "./data-source";

const port = 3000;

AppDataSource
    .initialize()
    .then(() => {
        console.log("MongoDB data source initialized!");
    })
    .catch((err: unknown) => {
        console.error("Error during the initialization of the MongoDB data source:", err);
    });
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
