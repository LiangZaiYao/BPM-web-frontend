<template>
  <div class="row">
    <div class="col-lg-10 col-md-12">
      <card>
        <template slot="header">
          <div class="row">
            <div class="col-sm-6">
              <h5 class="card-category">时间：{{formatedTime}}</h5>
              <h5 class="card-title">作者：{{authorName}}</h5>
            </div>
          </div>
        </template>
        <div class="row">
          <div class="col-12">
            <h5>话题：</h5><h3>{{text}}</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-3 col-sm-6">
            <img :src="tureImage" class="topic-images" type="image/jpg" >
          </div>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
  import APIUtil from '@/services/APIUtil';

  export default {
    name: "Topic",
    props: {
      text: String,
      time: Number,
      authorId: String,
      image: Object,
    },
    data(){
      return {
        authorName:'unknown'
      }
    },
    methods:{
      getAuthorName: function () {
        APIUtil.get('/User/?User.id='+ this.authorId
        ).then(response => {
          this.authorName = response.data.User[0].user_name
        }).catch(() => {
          console.log("查询作者用户名出错？？？")
        })
      },
    },
    computed:{
      formatedTime: function () {
        let date = new Date(this.time);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        month = month < 10 ? "0"+month:month;
        day = day < 10 ? "0"+day:day;
        return year+'-'+month+'-'+day;
      },
      tureImage: function () {
        // 还他妈能这样？？
        return 'http://localhost:8079/File/'+this.image
      }

    },
    mounted() {
      this.getAuthorName()
    }
  }
</script>

<style scoped>
  .topic-images {
    height: 120px;
  }
</style>
