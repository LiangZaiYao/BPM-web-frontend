<template>
  <div>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <div v-for="topic in topicList">
      <topic :authorId="topic.authorId"
             :time="topic.time"
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
  import fab from 'vue-fab'
  import APIUtil from '@/services/APIUtil';
  import Vue from 'vue'


  export default {
    name: "Topics",
    components: {
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
        friendIds: [],
        topicList: [],
        p: Object
      }
    },
    methods: {
      newTopic: function () {
        // to new page
        this.$router.push({
          path: 'edit-topic',
        })
      },
      isEmptyObject: function (obj) {
        for (var key in obj) {
          return false;//返回false，不为空对象
        }
        return true;//返回true，为空对象
      },
      refresh: function () {
        window.location.reload()
      },
      loadTopics: function () {
        APIUtil.get('/Friend/?Friend.user.id=' + sessionStorage.userId
        ).then(response => {
          if (this.isEmptyObject(response.data)) {
            //这用户没朋友
            return
          }
          var friends = response.data.Friend
          for (var i = 0; i < friends.length; i++) {
            this.friendIds.push(friends[i].usercard.user.id)
          }
          // console.log("好友id列表:", this.friendIds)
        }).catch(() => {
          console.log("好友id列表加载失败")
        }).then(() => {
          var arr = new Array() //请求数组
          for (var a = 0; a < this.friendIds.length; a++) { // 根据a个好友的id分别请求
            arr.push(APIUtil.get('/Topic/?Topic.user_id=' + this.friendIds[a]))
          }
          for (var a = 0; a < this.friendIds.length; a++) { // 对每个请求的返回体进行遍历
            arr[a].then(result => {
              if (this.isEmptyObject(result.data)) {
                // 这好友没发微博
                return
              }
              var topicToPush = {}
              for (var b = 0; b < result.data.Topic.length; b++) {
                //填充topicToPush
                topicToPush.text = result.data.Topic[b].text
                topicToPush.authorId = result.data.Topic[b].user_id
                topicToPush.time = result.data.Topic[b].create_time
                topicToPush.image = result.data.Topic[b].id
                this.topicList.push(topicToPush)
                // 开始读取关联的图片⬇
                // APIUtil.get('/File/'+result.data.Topic[b].id
                // ).then(response => {
                //   topicToPush.image = response
                // }).catch(() => {
                //   topicToPush.image = null
                //   console.log("未读取到图片")
                // }).finally(() => {
                //   // 不管是否读到图片，最后都将这个微博push进list
                //   this.topicList.push(topicToPush)
                //   // console.log(topicToPush)
                // })
              }
            })
          }
        })
      },
      loadImages: function () {
        var topics = new Array()
        for (var i = 0; i < this.topicList.length; i++) {
          topics.push(this.topicList[i].id)
        }
      }
    },
    mounted() {
      this.loadTopics()
      // this.getFriendIds()

    }
  }
</script>

<style scoped>

</style>
