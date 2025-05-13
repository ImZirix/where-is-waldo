// === DEPENDENCIES === //
import express from "express";
import { validateClick, getCharacters } from "../controllers/characters.js";

// === Initialize Express Router === //
const router = express.Router();

// === DEFINING ROUTES === //
router.get("/characters", getCharacters);
router.post("/validate", validateClick);

export default router;
