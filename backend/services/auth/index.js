import "dotenv/config";
import express from "express";
import connectDb from "./config/db.js";
import router from "./routes/auth.route.js";

const port = process.env.PORT;
const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
    res.json("Hello from Auth");
});
app.use("/", router);

app.listen(port, () => {
    connectDb();
    console.log(`auth started on port ${port}`);
});
