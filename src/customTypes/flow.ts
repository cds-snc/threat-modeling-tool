import { z } from 'zod';

export const FlowSchema = z.object({
  content: z.string().optional(),
}).strict();

export type Flow = z.infer<typeof FlowSchema>;