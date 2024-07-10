<template>
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

<style lang="scss" scoped>

</style>