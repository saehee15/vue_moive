<template>
  <div class="container">
    <div :class="{ 'no-result': !movies.length }" class="inner">
      <Loader v-if="loading" />
      <div v-if="message" class="message">
        {{ message }}
      </div>
      <!-- :movie는 pros임 movie라는 이름으로 데이터를 MovieItem 컴퍼넌트에 전달 -->
      <div v-else class="moives">
        <MovieItem v-for="movie in movies" :key="movie.imdbID" :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import MovieItem from "~/components/MovieItem";
import Loader from "~/components/Loader";
export default {
  components: {
    MovieItem,
    Loader,
  },
  computed: {
    movies() {
      return this.$store.state.movie.movies;
    },
    message() {
      return this.$store.state.movie.message;
    },
    loading() {
      return this.$store.state.movie.loading;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/scss/main.scss";
.container {
  margin-top: 30px;
  .inner {
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
    text-align: center;
    &.no-result {
      padding: 70px 0;
    }
  }
  .message {
    color: $gray-400;
    font-size: 20px;
  }
  .moives {
    display: flex;
    flex-wrap: wrap;
    // wrap 2줄 이상 생김
    justify-content: center;
  }
}
</style>
