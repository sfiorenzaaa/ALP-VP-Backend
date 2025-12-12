import { Router } from "express";
import authRoutes from "./authRoutes";
import songsRoutes from "./songsRoutes";
import journalRoutes from "./journalRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/songs", songsRoutes);
router.use("/journal", journalRoutes); // singular



export default router;
