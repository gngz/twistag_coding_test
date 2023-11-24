import { z } from 'zod';
import { RepositorySchema } from './repository';

export const SearchResponseSchema = z.object({
  items: RepositorySchema.array(),
});

export type SearchResponseDTO = z.input<typeof SearchResponseSchema>;
export type SearchResponseModel = z.output<typeof SearchResponseSchema>;
