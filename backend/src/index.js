import app from "./app.js";
import dotenv from 'dotenv';
import { connectDB } from "./db/db.js";

dotenv.config({
    path: './.env'
});

const port = process.env.PORT || 5000;

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
    console.log("database connection successful");
})
.catch((error) => {
    console.log(error);
    process.exit(1);
});