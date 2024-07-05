<template>
  <video src="/public/videos/video-jumbo.mp4" autoplay loop muted
  style="position:absolute; z-index:-1; object-fit: cover; width: 100%; height: 100vh;"></video>
  <div>
    <AppHeaderComponent />
    <router-view></router-view>
  </div>
</template>

<script>
import { store } from './store';
import axios from 'axios';
import AppHeaderComponent from './components/AppHeaderComponent.vue';
export default {
  name: 'App',
  components: {
    AppHeaderComponent
  },
  data() {
    return {
      store
    }
  },
  computed: {
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped></style>