import { defineStore } from 'pinia';
import { MoviesData } from 'src/stores/interface/models';
import MovieData from './dummy/movie';

export const MovieModule = defineStore('MovieModule', {
  state: () => ({
    listMovieData: [] as MoviesData[],
    currentPage: 1,
    totalMovie: 0,
  }),
  actions: {
    getAllMovie() {
      this.listMovieData = MovieData;
      this.totalMovie = MovieData.length;
    },
    addDataMovie(payload: any) {
      this.listMovieData = MovieData;
      this.listMovieData.unshift(payload);
    },
  },
  getters: {
    getlistMovieData(state) {
      return state.listMovieData;
    },
    getTotalMovie(state) {
      return state.totalMovie;
    },
  },
});
