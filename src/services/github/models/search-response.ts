import { z } from 'zod';
import { APIRepositorySchema } from './repository';

export const SearchResponseSchema = z.object({
  items: APIRepositorySchema.array(),
});

export type SearchResponseDTO = z.input<typeof SearchResponseSchema>;
export type SearchResponseModel = z.output<typeof SearchResponseSchema>;
