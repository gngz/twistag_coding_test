import { z } from 'zod';

export const CommitHistoryResponseSchema = z
  .object({
    all: z.number().array(),
  })
  .transform(({ all }) => all);

export type CommitHistoryDTO = z.input<typeof CommitHistoryResponseSchema>;
export type CommitHistoryModel = z.output<typeof CommitHistoryResponseSchema>;
