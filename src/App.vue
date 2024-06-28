<template>
  <div>
    <AppHeaderComponent />
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeaderComponent from './components/AppHeaderComponent.vue';
  export default {
    name: 'App',
    components: {
      AppHeaderComponent,
    }
  }
</script>

<style lang="scss" scoped>

</style>