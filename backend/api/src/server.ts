import app from "./app";
import {AppDataSource} from "./data-source";
import * as process from "process";
import * as cors from "cors";
import 'dotenv/config';

const port= process.env.PORT || 3010;
const frontendOrigin = process.env.FRONTEND_ORIGIN?.split(",")
    || "http://localhost:3000";


AppDataSource
    .initialize()
    .then(() => {
        console.log("MongoDB data source initialized!");
    })
    .catch((err: unknown) => {
        console.error("Error during the initialization of the MongoDB data source:", err);
    });

app.use(cors({ origin: frontendOrigin }));
app.options('*', cors());

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
