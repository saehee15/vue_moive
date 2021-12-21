<template>
  <div class="container">
    <div class="inner">
      <div class="message">
        {{ message }}
      </div>
      <!-- :movie는 pros임 movie라는 이름으로 데이터를 MovieItem 컴퍼넌트에 전달 -->
      <MovieItem v-for="movie in movies" :key="movie.imdbID" :movie="movie" />
    </div>
  </div>
</template>
<script>
import MovieItem from "~/components/MovieItem";
export default {
  components: {
    MovieItem,
  },
  computed: {
    movies() {
      return this.$store.state.movie.movies;
    },
    message() {
      return this.$store.state.movie.message;
    },
  },
};
</script>
