import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
dotenv.config()

const port = process.env.PORT;
const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.json("Hello from Agents");
})
// app.use("/", router)

app.listen(port, () => {
    connectDb()

    console.log(`Agents server started on port ${port}`);
})   