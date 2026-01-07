import {z, ZodType } from "zod";

export class EventValidation{
    static readonly CREATE: ZodType = z.object(({
        title: z.string().min(1),
        description : z.string().min(1),
        date : z.string().transform((str) => new Date(str))
    }));

    static readonly UPDATE_STATUS: ZodType = z.object (({
        status: z.enum(["APPROVE", "REJECT"]),
    }));
}