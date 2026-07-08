import express from 'express';
import dotenv from 'dotenv';
import proxy from 'express-http-proxy';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { protect } from './middlewares/auth.middleware.js';
import getCurrentUser from './controllers/users.controller.js';
import { proxyWithHeader } from './utils/proxyWithHeader.js';
dotenv.config()

const port = process.env.PORT;
const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))


app.use(cookieParser())
app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL))
app.use("/api/chat", proxyWithHeader(process.env.CHAT_SERVICE_URL))
app.use("/api/me", protect, getCurrentUser)


app.get("/", (req, res) => {
    res.json("Hello from gateway");
})

app.listen(port, () => {
    console.log(`GateWay Server started on port ${port}`);
})   