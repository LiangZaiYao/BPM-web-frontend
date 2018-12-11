<template>
  <div>
    <auth-layout v-if="needAuth"></auth-layout>
    <div v-else>
      <notifications></notifications>
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    methods: {
      disableRTL() {
        if (!this.$rtl.isRTL) {
          this.$rtl.disableRTL();
        }
      },
      toggleNavOpen() {
        let root = document.getElementsByTagName('html')[0];
        root.classList.toggle('nav-open');
      }
    },
    computed: {
      needAuth () {
        // if (this.$route.path === '/') {
        //   return true
        // } else {
        //   return this.$route.path.match('auth')
        // }

        if (sessionStorage.userName === null){
          return true
        }
        else {
          return false
        }
      }
    },
    mounted() {
      this.$watch('$route', this.disableRTL, { immediate: true });
      this.$watch('$sidebar.showSidebar', this.toggleNavOpen)
    }
  };
</script>

<style lang="scss"></style>
