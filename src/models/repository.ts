import { APIRepositoryModel } from '@/services/github/models/repository';

export type RepositoryModel = APIRepositoryModel & {
  color: string;
  stats?: number[];
  selected: boolean;
};
