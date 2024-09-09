import { z } from "zod";

export const Currency = z.enum(["USD", "EUR", "PLN"]);

export type Currency = z.infer<typeof Currency>;
