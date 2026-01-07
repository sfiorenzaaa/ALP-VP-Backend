import express from "express"
import authMiddleware from "../middlewares/auth-middleware"
import { EventController } from "../controllers/event-controller"
import { adminMiddleware } from "../middlewares/admin-middleware"
import { createSong } from "../services/songsService"
import journalRoutes from "./journalRoutes"
import petRoutes from "./pet-routes"
export const privateRouter = express.Router()


privateRouter.use(authMiddleware);


// Event Routes
privateRouter.post('/events', EventController.create);
privateRouter.get('/events/my', EventController.listMine);
privateRouter.get('/events/pending', adminMiddleware, EventController.listPending);
privateRouter.patch('/events/:id', adminMiddleware, EventController.approveReject)
privateRouter.post('/events/:id/join', EventController.join);
privateRouter.post("/songs", createSong);

// Journal Routes (Private)
privateRouter.use("/journal", journalRoutes);

// Pet Routes (Private)
privateRouter.use("/pets", petRoutes);
privateRouter.use("/journal", journalRoutes);

export default privateRouter;