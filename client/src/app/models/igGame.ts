import cover from './cover';

export interface igGame {
  id: number;
  name: string;
  summary?: string;
  cover?: cover;
}
