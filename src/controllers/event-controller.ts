import { Request, Response, NextFunction } from "express";
import { EventService } from "../services/event-service";

export class EventController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            
            const result = await EventService.create((req as any).user, req.body);
            res.status(201).json({ data: result });
        } catch (e) { next(e); }
    }

    static async listPublic(req: any, res: any, next: any){
        try {
            const userId = req.user?.id;
            const result = await EventService.listPublicEvents(userId);
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

    static async listPending(req : Request, res : Response, next : NextFunction){
        try{
            const result = await EventService.listPendingEvents();
            res.status(200).json({data : result});
        } catch (e) {next(e);}
    }

    static async join(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as any).user.id;
        const eventId = Number(req.params.id); 

        const result = await EventService.joinEvent(userId, eventId);
        res.status(200).json({ data: result, message: "Successfully joined event!" });
    } catch (e) {
        next(e);
    }
}
}