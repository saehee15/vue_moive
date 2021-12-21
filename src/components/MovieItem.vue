<template>
  <div>{{ movie.imdbID }}</div>
</template>
<script>
export default {
  props: {
    // MovieList.vue에서 정의한 props
    movie: {
      type: Object,
      // 데이터의 가변성 때문에 함수로 작성, 밑에는 화살표함수로 작성한 거임
      default: () => ({}),
    },
  },
};
</script>