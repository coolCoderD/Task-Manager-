import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import connectDB from "./src/config/db.js";

dotenv.config();
const port = process.env.PORT || 8000;

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Dynamic route imports
const routesFiles = fs.readdirSync("./src/routes");
for (const file of routesFiles) {
  try {
    const route = await import(`./src/routes/${file}`);
    app.use("/api", route.default);
  } catch (error) {
    console.error(`Error importing ${file}: ${error.message}`);
  }
}

// Root endpoint
app.get("/", (req, res) => {
  res.send("Hello");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

// Start the server
const server = async () => {
  try {
     await connectDB();
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.log(`Error occurred: ${error.message}`);
  }
};

server();
