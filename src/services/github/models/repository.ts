import { z } from 'zod';

export const APIRepositorySchema = z
  .object({
    id: z.number(),
    full_name: z.string(),
    updated_at: z.string(),
    stargazers_count: z.number(),
  })
  .transform(({ stargazers_count, ...rest }) => ({
    ...rest,
    stars: stargazers_count,
  }));

export type APIRepositoryModel = z.output<typeof APIRepositorySchema>;
