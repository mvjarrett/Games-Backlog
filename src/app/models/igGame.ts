import cover from './cover';
import genre from './genre';
import platform from './platform';
import screenshot from './screenshot';


export interface igGame {
  id: number;
  name?: string;
  summary?: string;
  cover: cover;
  first_release_date?: number;
  genres?: genre[];
  platforms?: platform[];
  rating: number;
  screenshots?: screenshot[];
  url?: string;

}
