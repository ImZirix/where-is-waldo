// === DEPENDENCIES === //
import "dotenv/config";
import express from "express";
import cors from "cors";

// === ROUTE IMPORTS === //
import characterRoutes from "./routes/characterRoutes.js";

// === Initialize Express application === //
const app = express();

// === MIDDLEWARE SETUP === //
app.use(cors({ origin: process.env.CORS }));
app.use(express.json());

// === ROUTE MOUNTING === //
app.use("/api", characterRoutes);

// === SERVER INITIALIZATION === //
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
