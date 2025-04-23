// types/Movie.ts
export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview?: string;
    release_date?: string;
    vote_average?: number;
    [key: string]: any;
  }
  

export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  biography: string;
  birthday: string;
  known_for_department: string;
}

export interface MovieCredits {
  cast: {
    id: number;
    character: string;
    name: string;
    profile_path: string | null;
  }[];
  crew: {
    id: number;
    department: string;
    job: string;
    name: string;
    profile_path: string | null;
  }[];
}

export interface SearchParams {
  query: string;
  page?: number;
}


// Types
export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails {
  id: number;
  title: string;
  status: string;
  release_date: string;
  runtime: number;
  overview: string;
  poster_path: string;
  genres: Genre[];
}

export interface MovieParam {
  item: any; // JSON string, will be parsed
}