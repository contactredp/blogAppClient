<script>
  import BannerComponent from '../components/BannerComponent.vue';
  import HighlightsComponent from '../components/HighlightsComponent.vue';

  export default {
    components: {
      BannerComponent,
      HighlightsComponent
    },
    data() {
      return {
        bannerProps: {
          title: "Blog Application",
          tagline: "S87-S89 Activity",
          destination: "Posts",
          buttonLabel: "View Posts"
        }
      }
    }
  }
</script>

<template>
  <div class="container-fluid">
    <BannerComponent :bannerProps=bannerProps />
    <HighlightsComponent />
  </div>
</template>

<style scoped>

</style>
