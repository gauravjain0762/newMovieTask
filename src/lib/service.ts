import { Movie, } from "../constants/types";
import { apiCall } from "./Global";
import {  movieDetailsEndpoint, moviesEndpoint, movieSimilarEndpoint, movieVideosEndpoint,  } from "./moviesdb";

// Movie-related
export const fetchMovies = (): Promise<{ results: Movie[] }> => {
    return apiCall<{ results: Movie[] }>(moviesEndpoint);
  };
  
  export const fetchMovieDetails = (id: number): Promise<Movie> => {
    return apiCall<Movie>(movieDetailsEndpoint(id));
  };
  
  export const fetchSimilarMovies = (id: number): Promise<{ results: Movie[] }> => {
    return apiCall<{ results: Movie[] }>(movieSimilarEndpoint(id));
  };

  export const fetchVideoMovies = (id: number): Promise<{ results: Movie[] }> => {
    return apiCall<{ results: Movie[] }>(movieVideosEndpoint(id));
  };