import { Request, Response, NextFunction } from "express";
import { EventService } from "../services/event-service";

export class EventController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            
            const result = await EventService.create((req as any).user, req.body);
            res.status(201).json({ data: result });
        } catch (e) { next(e); }
    }

    static async listPublic(req : Request, res: Response, next: NextFunction){
        try {
            const result = await EventService.listPublicEvents();
            res.status(200).json({ data : result});
        } catch (e) {next(e);}
    }

    static async listMine(req : Request, res: Response, next: NextFunction){
        try {
            const user = (req as any).user;
            const result = await EventService.listMyEvents(user.id);
            res.status(200).json({ data : result});
        } catch (e) {next(e);}
    }

    static async approveReject(req : Request, res: Response, next: NextFunction){
        try {
            const eventId = parseInt(req.params.id)
            const result = await EventService.updateStatus(eventId, req.body);
            res.status(200).json({ data : result});
        } catch (e) {next(e);}
    }
}