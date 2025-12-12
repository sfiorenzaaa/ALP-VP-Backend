import express from "express";
import { EventController } from "../controllers/event-controller";
import { UserController } from "../controllers/user-controller";
import { getSongs } from "../controllers/songsController";

export const publicRouter = express.Router();


publicRouter.get('/events', EventController.listPublic)
publicRouter.post('/users/login', UserController.login);
publicRouter.get("/songs", getSongs);
publicRouter.post("/users", UserController.register);
publicRouter.post("/users/login", UserController.login)