<template>
  <div>
    <div v-for="text in texts">
      <h2>{{text}}</h2>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FriendZone",
    data() {
      return {
        texts:['1','2','3']
      }
    }
  }
</script>

<style scoped>

</style>
