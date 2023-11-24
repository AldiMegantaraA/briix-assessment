<template>
  <q-page class="q-ma-lg">
    <movies-card
      title="List Data Movies"
      active
      :movies="movies"
      :totalMovie="totalMovie"
      :meta="meta"
      class="q-mx-lg"
    ></movies-card>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="addMovie" />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import MoviesCard from 'src/components/MoviesCard.vue';
import { defineComponent, onMounted, ref } from 'vue';
import router from 'src/router';
import { MovieModule } from 'src/stores/movies';
import { MoviesData } from 'src/stores/interface/models';

function addMovie() {
  router?.push({ path: '/add-movie' });
}

export default defineComponent({
  name: 'IndexPage',
  components: { MoviesCard },
  setup() {
    const movies = ref([] as MoviesData[]);
    const totalMovie = ref(0);
    const movieStore = MovieModule();
    onMounted(async () => {
      await movieStore.getAllMovie();
      movies.value = movieStore.getlistMovieData;
      totalMovie.value = movieStore.getTotalMovie;
    });
    return { movies, addMovie, totalMovie };
  },
});
</script>
