import { Router } from "express";
import { getSongs, createSong } from "../controllers/songsController";
import auth from "../middleware/authMiddleware";

const router = Router();

router.post("/", auth, createSong); // route baru untuk create song
router.get("/", getSongs);

export default router;
