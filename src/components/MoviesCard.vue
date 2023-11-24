<template>
  <div>
    <div class="text-center">
      <q-input
        color="purple-12"
        v-model="text"
        label="Search"
        v-model.trim="search"
        @keyup="data"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div
      class="row items-center justify-center q-gutter-md q-mt-md"
      v-if="moviesData.length > 0"
    >
      <q-card
        class="col-12 col-md-3"
        flat
        bordered
        v-for="movie in moviesData"
        :key="movie.id"
      >
        <q-img
          :ratio="16 / 9"
          :src="movie.images"
          :alt="movie.title"
          class="fit"
        >
          <div
            class="absolute-bottom text-subtitle2 text-left"
            v-if="movie.isNew"
          >
            <q-chip color="secondary" text-color="white" icon="info">
              New Release
            </q-chip>
          </div>
        </q-img>

        <q-card-section>
          <div class="text-overline text-orange-9">{{ movie.director }}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ movie.title }}</div>
          <div class="text-caption text-grey cardMovie">
            {{ movie.content }}
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat color="primary" :label="movie.category" />
        </q-card-actions>
      </q-card>
    </div>
    <h4 v-else>No movies found!</h4>
  </div>
  <div class="q-pa-lg flex flex-center">
    <q-pagination v-model="current" :max="totalPages" direction-links />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { MoviesData } from './models';

export default defineComponent({
  name: 'MoviesCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    totalMovie: {
      type: Number,
      required: true,
    },
    movies: {
      type: Array as PropType<MoviesData[]>,
      default: () => [],
    },
  },
  setup() {
    const limitPerPage = ref(6);

    let current = ref(0);
    function onPageChange(page: number) {
      current.value = page;
    }
    return {
      current,
      limitPerPage,
      search: ref(''),
      onPageChange,
    };
  },
  computed: {
    moviesData() {
      const data = this.movies.slice(this.indexStart, this.indexEnd);
      if (data) {
        if (this.search) {
          return data.filter((item: any) =>
            item.title.toLowerCase().includes(this.search.toLowerCase())
          );
        } else {
          return data;
        }
      }
      return data;
    },
    totalPages() {
      const totalPage = Math.ceil(this.totalMovie / this.limitPerPage);
      return totalPage;
    },
    indexStart() {
      return (this.current - 1) * this.limitPerPage;
    },
    indexEnd() {
      return this.indexStart + this.limitPerPage;
    },
  },
});
</script>
