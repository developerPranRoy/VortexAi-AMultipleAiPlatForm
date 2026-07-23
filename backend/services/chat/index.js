import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import router from './routes/chat.route.js';
dotenv.config()

const port = process.env.PORT;
const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.json("Hello from Chat");
})
app.use("/", router)

app.listen(port, () => {
    connectDb()
    
    console.log(`Chat server started on port ${port}`);
})   