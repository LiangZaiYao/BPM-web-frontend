<template>
  <div>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <div v-for="topic in topics">
      <topic :author="topic.author"
             :time = "topic.time"
             :text="topic.text"
             :image="topic.image"></topic>
    </div>
    <fab
      :position="position"
      :bg-color="mainBtnColor"
      :actions="fabActions"
      @reflash="refresh"
      @newTopic="newTopic"
    ></fab>
  </div>
</template>

<script>
  import Topic from '@/components/Topic/Topic'
  import VueFab from 'vue-float-action-button'
  import fab from 'vue-fab'
  export default {
    name: "Topics",
    components:{
      Topic,
      // VueFab,
      fab
    },
    data() {
      return {
        mainBtnColor: "#42b883",
        position: 'bottom-right',
        fabActions: [
          {
            name: 'reflash',
            icon: 'cached'
          },
          {
            name: 'newTopic',
            icon: 'library_add'
          }
        ],
        topics:[
          {
            author: "yaoyao",
            time: "2018-9-12",
            text: "我是遥遥",
            image: "http://img3.imgtn.bdimg.com/it/u=264373952,3320432029&fm=26&gp=0.jpg",
          },
          {
            author: "shengsheng",
            time: "2018-12-12",
            text: "我是生生",
            image: "http://img1.imgtn.bdimg.com/it/u=3036823894,2067042913&fm=26&gp=0.jpg",
          },
          {
            author: "hanghang",
            time: "2018-11-12",
            text: "我是航航",
            image: "http://img5.imgtn.bdimg.com/it/u=1057973825,1828017522&fm=26&gp=0.jpg"
          }
        ]
      }
    },
    methods: {
      newTopic:function () {
        // to new page
        this.$router.push({
          path: 'edit-topic',
        })
      },
      refresh: function () {
        window.location.reload()
      },
    }
  }
</script>

<style scoped>

</style>
