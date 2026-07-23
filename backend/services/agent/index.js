import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import connectDb from './config/db.js';
import router from './routes/agent.route.js';

const result = dotenv.config();

// console.log(result);
// console.log(process.env.GROQ_API_KEY);

const port = process.env.PORT;
const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.json("Hello from Agents");
})
app.use("/", router)

app.listen(port, () => {
    connectDb()

    console.log(`Agents server started on port ${port}`);
})   