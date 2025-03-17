import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors({
    origin: process.env.CROS_ORIGIN || "http://localhost:5173",
    credentials: true,
}));


app.use(cookieParser());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ extended: true, limit: "40kb" }));
app.use("/src", express.static("src", { extensions: ["css"] }));

import contactRouter from "./routes/contact.route.js";

app.use('/api/v1/contact', contactRouter);

export default app;