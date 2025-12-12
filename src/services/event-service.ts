import { prismaClient } from "../utils/database-util";
import { EventValidation } from "../validations/event-validation";
import { Validation } from "../validations/validation";
import { ResponseError } from "../error/response-error";
import { EventStatus } from "@prisma/client";
import { includes } from "zod";


export class EventService {
    
    static async create(user :any, request :any){
        const eventData = Validation.validate(EventValidation.CREATE, request);


        if (!user || !user.id) {
            throw new ResponseError(401, "User not found or invalid token");
        }


        return await prismaClient.event.create({
            data: {
                title: eventData.title,
                description: eventData.description,
                eventDate: eventData.date, 
                status: "PENDING",
                userId: user.id
            }
        });
    }
    static async listPublicEvents(){
        return await prismaClient.event.findMany({
            where: {
                status: "APPROVE",
            },
            include: {
                user: { select: {username :true}}
            }
        });
    }

    static async listMyEvents(userId : number){
        return await prismaClient.event.findMany({
            where: {
                userId : userId
            }
        });
    }

    static async updateStatus(eventId : number, request: any){
        const data = Validation.validate(EventValidation.UPDATE_STATUS, request);
        
        const event = await prismaClient.event.findUnique({ where: {id : eventId} });
        if (!event) throw new ResponseError(404, "Event Not Found");

        return await prismaClient.event.update({
            where: {
                id: eventId,
            },
            data: {
                status : data.status as EventStatus
            },
        });
    }
}