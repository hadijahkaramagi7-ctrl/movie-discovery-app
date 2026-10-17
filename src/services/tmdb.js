import axios from "axios";

// This safely reads the key from your .env file
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

const api = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
});

// Helper to build full image URLs
export const getImageUrl = (path, size = "w500") => {
  if (!path) return null;
  return `${IMAGE_BASE}/${size}${path}`;
};

export const fetchTrending = async () => {
  const { data } = await api.get("/trending/all/week");
  return data.results;
};

export const fetchPopularMovies = async () => {
  const { data } = await api.get("/movie/popular");
  return data.results;
};

export const fetchPopularTV = async () => {
  const { data } = await api.get("/tv/popular");
  return data.results;
};

export const searchMulti = async (query) => {
  const { data } = await api.get("/search/multi", { params: { query } });
  return data.results.filter((item) => item.media_type !== "person");
};

export const fetchDetails = async (id, type) => {
  const { data } = await api.get(`/${type}/${id}`);
  return data;
};
