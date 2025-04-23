import axios from 'axios';
import { apiKey } from '../constants/constants';
import { Movie, Person, MovieCredits, SearchParams } from '../constants/types';

const apiBaseUrl = 'https://api.themoviedb.org/3';
const moviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const movieDetailsEndpoint = (id: number) => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = (id: number) => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const movieSimilarEndpoint = (id: number) => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;
const personDetailEndpoint = (id: number) => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const persoMoviesEndpoint = (id: number) => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;


export const imageUrl = (path: string | null): string | null =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;

export const fallbackMoviePoster =
  'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';

export const fallbackPersonImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';


const apiCall = async <T>(endpoint: string, params?: any): Promise<T> => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params || {},
  };

  try {
    const response = await axios.request<T>(options);
    return response.data;
  } catch (err) {
    console.error("error: ", err);
    return {} as T;
  }
};


// Movie-related
export const fetchMovies = (): Promise<{ results: Movie[] }> => {
  return apiCall<{ results: Movie[] }>(moviesEndpoint);
};

export const fetchMovieDetails = (id: number): Promise<Movie> => {
  return apiCall<Movie>(movieDetailsEndpoint(id));
};

export const fetchMovieCredits = (id: number): Promise<MovieCredits> => {
  return apiCall<MovieCredits>(movieCreditsEndpoint(id));
};

export const fetchSimilarMovies = (id: number): Promise<{ results: Movie[] }> => {
  return apiCall<{ results: Movie[] }>(movieSimilarEndpoint(id));
};

// Person-related
export const fetchPersonDetails = (id: number): Promise<Person> => {
  return apiCall<Person>(personDetailEndpoint(id));
};

export const fetchPersonMovies = (id: number): Promise<{ cast: Movie[]; crew: Movie[] }> => {
  return apiCall<{ cast: Movie[]; crew: Movie[] }>(persoMoviesEndpoint(id));
};

// Search
export const searchMovies = (params: SearchParams): Promise<{ results: Movie[] }> => {
  return apiCall<{ results: Movie[] }>(searchMoviesEndpoint, params);
};
