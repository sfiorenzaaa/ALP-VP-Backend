import { prismaClient } from "../utils/database-util";
import { EventValidation } from "../validations/event-validation";
import { Validation } from "../validations/validation";
import { ResponseError } from "../error/response-error";
import { EventStatus } from "@prisma/client";
import { includes } from "zod";


export class EventService {

    static async create(user: any, request: any) {
        const eventData = Validation.validate(EventValidation.CREATE, request);

        if (!user || !user.id) {
            throw new ResponseError(401, "User not found or invalid token");
        }

        const newEvent = await prismaClient.event.create({
            data: {
                title: eventData.title,
                description: eventData.description,
                eventDate: eventData.date,
                status: "PENDING",
                userId: user.id
            },
            include: {
                user: true
            },
        });

        return {
            ...newEvent,
            author: newEvent.user.username
        };
    }
    static async listPublicEvents(userId : number) {
        const events = await prismaClient.event.findMany({
            where: {
                status: "APPROVE",
            },
            include: {
                user: true,
                participants: {
                    where: {
                        userId: userId
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return events.map(event => ({
            id: event.id,
            title: event.title,
            description: event.description,
            date: event.eventDate,
            status: event.status,
            author: event.user ? event.user.username : "Unknown",
            isJoined: event.participants.length > 0
        }));
    }

    static async listMyEvents(userId: number) {
        const events = await prismaClient.event.findMany({
            where: {
                OR : [
                    {
                        userId: userId
                    },

                    {
                        participants: {
                    some: {
                        userId: userId
                    }
                }
            }
        ]
            },
            include: {
                user: true,
                participants : {
                    where : {userId : userId}
                }
            },
            orderBy: {
                createdAt : 'desc'
            }
        });

        return events.map(event => ({
            id: event.id,
            title: event.title,
            description: event.description,
            date: event.eventDate,
            status: event.status,
            author: event.user ? event.user.username : "Unknown",
            isJoined: event.participants.length > 0,
            isMyEvent: event.userId === userId 
        }));
    }

    static async updateStatus(eventId: number, request: any) {
        const data = Validation.validate(EventValidation.UPDATE_STATUS, request);

        const event = await prismaClient.event.findUnique({ where: { id: eventId } });
        if (!event) throw new ResponseError(404, "Event Not Found");

        return await prismaClient.event.update({
            where: {
                id: eventId,
            },
            data: {
                status: data.status as EventStatus
            },
        });
    }

    static async listPendingEvents() {
        const events = await prismaClient.event.findMany({
            where: {
                status: "PENDING"
            },
            include: {
                user: { select: { username: true, email: true } }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return events.map(event => ({
            id: event.id,
            title: event.title,
            description: event.description,
            date: event.eventDate,
            status: event.status,
            author: event.user ? event.user.username : "Unknown",
            isJoined: false
        }));
    }

    static async joinEvent(userId: number, eventId: number) {

        const event = await prismaClient.event.findUnique({ where: { id: eventId } });

        if (!event) throw new ResponseError(404, "Event not found");
        if (event.status !== "APPROVE") throw new ResponseError(400, "Cannot join unapproved event");

        const existing = await prismaClient.participant.findUnique({
            where: {
                userId_eventId: {
                    userId: userId,
                    eventId: eventId
                }
            }
        });

        if (existing) throw new ResponseError(400, "You already joined this event");

        return await prismaClient.participant.create({
            data: {
                userId: userId,
                eventId: eventId
            }
        });
    }
}