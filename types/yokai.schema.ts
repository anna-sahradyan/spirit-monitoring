import { z } from "zod";

export const yokaiStatusSchema = z.enum([
    "active",
    "captured",
    "caught",
    "escaped",
    "in_progress",
    "detected",
    "confirmed",
]);

export const yokaiThreatSchema = z.enum([
    "low",
    "medium",
    "high",
    "critical",
]);

export const yokaiSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    lat: z.number(),
    lng: z.number(),
    threat: yokaiThreatSchema,
    status: yokaiStatusSchema,
});

export type YokaiStatus = z.infer<typeof yokaiStatusSchema>;
export type YokaiThreat = z.infer<typeof yokaiThreatSchema>;
export type Yokai = z.infer<typeof yokaiSchema>;

