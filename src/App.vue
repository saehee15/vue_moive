<template>
  <Header />
  <RouterView />
  <Footer />
</template>


<script>
import Header from "~/components/Header";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>