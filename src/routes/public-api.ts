import express from "express";
import { EventController } from "../controllers/event-controller";
import { UserController } from "../controllers/user-controller";
import { getSongs } from "../controllers/songsController"; 
export const publicRouter = express.Router();

publicRouter.post('/users/login', UserController.login);
publicRouter.post('/users/register', UserController.register);

// Route lain tetap sama
publicRouter.get('/events', EventController.listPublic);
publicRouter.get('/songs', getSongs);