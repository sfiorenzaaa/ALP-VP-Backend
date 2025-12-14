import express from "express"
import authMiddleware from "../middlewares/auth-middleware"
import { EventController } from "../controllers/event-controller"
import { adminMiddleware } from "../middlewares/admin-middleware"
import { Router } from "express"
import { createSong } from "../services/songsService"
import journalRoutes from "./journalRoutes"
import petRoutes from "./pet-routes"
export const privateRouter = express.Router()

privateRouter.use(authMiddleware)

privateRouter.post('/events', EventController.create);
privateRouter.get('/events/my', EventController.listMine);

privateRouter.patch('/events/:id', adminMiddleware, EventController.approveReject)

const router = Router();
router.use(authMiddleware);

router.post("/songs", createSong);

// Journal Routes (Private)
router.use("/journal", journalRoutes);

// Pet Routes (Private)
router.use("/pets", petRoutes);

export default router;