<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el
        label="Home"
        icon="home"
        @click="backHome"
        class="cursor-pointer"
      />
      <q-breadcrumbs-el label="Add Movie" icon="widgets" />
    </q-breadcrumbs>
  </div>
  <h5 class="q-pa-md">Add Movie Page</h5>
  <div class="q-pa-md">
    <q-form class="q-gutter-md">
      <q-input
        v-model="title"
        label="Title *"
        hint="Title of the movie"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Title required!']"
      />

      <q-input
        v-model="director"
        label="Director *"
        hint="Director of the movie"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Director required!']"
      />

      <q-input
        type="text"
        v-model="content"
        label="Summary *"
        hint="Summary of the movie"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Summary required!']"
      />

      <q-input
        type="text"
        v-model="images"
        label="Image *"
        hint="URL Image of the movie ex: https://images-amazon.com/ad_.jpg"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Image required!']"
      />

      <div
        class="q-pa-sm rounded-borders"
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
      >
        Category:
        <q-option-group
          v-model="category"
          :options="options"
          type="checkbox"
          color="primary"
          inline
        />
      </div>

      <div>
        <q-btn
          label="Confirm"
          color="primary"
          type="button"
          @click="confirmSave"
        />
        <q-btn
          label="Reset"
          type="reset"
          @click="onReset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Are you sure want to save the movie?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />

        <q-btn
          label="Submit"
          @click="onSubmit"
          color="primary"
          icon="send"
          type="button"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import router from 'src/router';
import { MovieModule } from 'src/stores/movies';
import { defineComponent, ref } from 'vue';

function backHome() {
  router?.push({ path: '/' });
}

export default defineComponent({
  name: 'add-movie-page',
  setup() {
    const title = ref('');
    const director = ref('');
    const content = ref('');
    const images = ref('');
    const confirm = ref(false);
    const category = ref([]);
    const $q = useQuasar();

    function onReset() {
      title.value = '';
      director.value = '';
      images.value = '';
      content.value = '';
      category.value = [];
    }

    return {
      title,
      content,
      category,
      images,
      director,
      confirm,
      options: [
        { label: 'Action', value: 'Action' },
        { label: 'Drama', value: 'Drama' },
        { label: 'History', value: 'History' },
        { label: 'Adventure', value: 'Adventure' },
        { label: 'Comedy', value: 'Comedy' },
        { label: 'Crime', value: 'Crime' },
        { label: 'Sci-Fi', value: 'Sci-Fi' },
      ],
      confirmSave() {
        if (
          title.value !== '' &&
          director.value !== '' &&
          content.value !== '' &&
          images.value !== '' &&
          category.value.length > 0
        ) {
          confirm.value = true;
        } else {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to fill all field',
          });
        }
      },
      onReset,
      onSubmit() {
        const movieStore = MovieModule();
        movieStore.addDataMovie({
          id: 'id' + Math.random().toString(16).slice(2),
          title: title.value,
          director: director.value,
          images: images.value,
          content: content.value,
          category: category.value.join(', '),
          isNew: true,
        });
        router.push('/');
      },
      backHome,
    };
  },
});
</script>
