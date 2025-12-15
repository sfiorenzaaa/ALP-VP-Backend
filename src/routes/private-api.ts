import express from "express"
import authMiddleware from "../middlewares/auth-middleware"
import { EventController } from "../controllers/event-controller"
import { adminMiddleware } from "../middlewares/admin-middleware"
import { Router } from "express"
import { createSong } from "../services/songsService"
import journalRoutes from "./journalRoutes"


export const privateRouter = express.Router()


privateRouter.use(authMiddleware);


privateRouter.post('/events', EventController.create);
privateRouter.get('/events/my', EventController.listMine);
privateRouter.get('/events/pending', authMiddleware, adminMiddleware, EventController.listPending);
privateRouter.patch('/events/:id', adminMiddleware, EventController.approveReject)

privateRouter.post("/songs", createSong);

// Journal Routes (Private)
privateRouter.use("/journal", journalRoutes);

export default privateRouter;