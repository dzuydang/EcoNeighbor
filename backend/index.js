import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware 
app.use(helmet()); // used for security to protect app by setting various HTTP headers
app.use(cors()); // manage cross-origin requests
app.use(morgan("dev")); //logs requets to console
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/test", (req, res) => {
    res.send("Hello");
});

app.listen(PORT, () => {
    console.log("Server is Running on " + PORT);
});