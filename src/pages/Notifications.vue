<template>
  <div class="row">
    <div class="col-md-4">
      <card>
        <h4 slot="header">联系人推荐</h4>
        <div v-for="person in recommendList">
          <base-alert type="info" dismissible with-icon>
            <div>
            <span data-notify="icon" class="tim-icons icon-satisfied"></span>
            <div class="row">
              <span data-notify="message" class="recommend-name">联系人:{{person.user.user_name}}</span>
            </div>
            <div class="row">
              <div class="col-md-4">
                <span data-notify="message" class="recommend-number">共同好友：{{person.friendNum}}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <base-button type="primary" @click="addFriend(person.user.id)">添加好友</base-button>
              </div>
            </div>
            </div>
          </base-alert>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
  import NotificationTemplate from './Notifications/NotificationTemplate';
  import {BaseAlert} from '@/components';
  import APIUtil from '@/services/APIUtil';


  export default {
    components: {
      BaseAlert
    },
    data() {
      return {
        type: ["", "info", "success", "warning", "danger"],
        notifications: {
          topCenter: false
        },
        recommendList:[]
      };
    },
    methods: {
      notifyVue(verticalAlign, horizontalAlign) {
        const color = Math.floor(Math.random() * 4 + 1);
        this.$notify({
          component: NotificationTemplate,
          icon: "tim-icons icon-bell-55",
          horizontalAlign: horizontalAlign,
          verticalAlign: verticalAlign,
          type: this.type[color],
          timeout: 1000 //提示消失的时间，若为0则一直保留
        });
      },
      loadRecommend:function () {
        APIUtil.get('Recommend/'+sessionStorage.userId
        ).then(response => {
          this.recommendList = response.data.recommendList
        }).catch(() => {
          console.log("加载推荐失败")
        })
      },
      addFriend:function (friendId) {
        console.log("他："+friendId + "，我："+ sessionStorage.userId)
      }
    },
    mounted() {
      this.loadRecommend()
    }
  };
</script>
<style>
  .recommend-name {
    font-size: x-large;
    font-weight: bolder;
    color: #FFFFFF;
  }

  .recommend-number {

  }
</style>
