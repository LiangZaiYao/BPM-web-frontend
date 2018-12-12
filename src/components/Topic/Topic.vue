<template>
  <div class="row">
    <div class="col-lg-10 col-md-12">
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
          <div class="col-12">
            <h5>话题：</h5><h3>{{text}}</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-3 col-sm-6" v-for="image in images">
            <img :src="image" class="topic-images">
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
      images: Array,
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
  .topic-images {
    height: 120px;
  }
</style>
