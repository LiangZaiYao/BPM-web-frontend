<template>
  <div class="row">
    <div class="col-12">
      <card>
        <template slot="header">
          <div class="row">
            <div class="col-sm-6">
              <h5 class="card-category">时间：{{time}}</h5>
              <h5 class="card-title">作者：{{author}}</h5>
            </div>
          </div>
        </template>
        <div class="row">
          <div class="col-8">
            <h5>话题：</h5><h3>{{text}}</h3>
          </div>
          <div class="col-4">
            <img :src="image"/>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Topic",
    props: {
      text: String,
      time: String,
      author: String,
      image: String
    },
    data(){
      return {

      }
    },
    methods:{

    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
