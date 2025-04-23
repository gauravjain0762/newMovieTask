import {apiKey } from '../constants/constants';

export const moviesEndpoint = `/trending/movie/day?api_key=${apiKey}`;
export const movieDetailsEndpoint = (id: number) => `/movie/${id}?api_key=${apiKey}`;
export const movieSimilarEndpoint = (id: number) => `/movie/${id}/similar?api_key=${apiKey}`;
export const movieVideosEndpoint = (id: number) => `/movie/${id}/videos?api_key=${apiKey}`;
export const getYouTubeVideoUrl = (key: string) => `https://www.themoviedb.org/video/play?key=${key}&width=948&height=700&_=1745393334922`;

export const imageUrl = (path: string | null): string | null =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;

export const fallbackMoviePoster =
  'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';

export const fallbackPersonImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

