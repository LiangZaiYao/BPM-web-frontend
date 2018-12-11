<template>
  <div>
    <card>
      <h4 slot="header">Please Login</h4>
      <div class="row">
        <div class="col-lg-6 ml-auto mr-auto">
          <div class="row">
            <div class="col-md-8 pl-md-1">
              <base-input label="UserName"
                          placeholder="UserName"
                          v-model="userData.user_name">
              </base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-8 pl-md-1">
              <base-input label="Password"
                          placeholder="Password"
                          v-model="userData.user_pwd"
                          type="password">
              </base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-lg-4">
              <base-button type="primary" fill @click="onLogin">Login</base-button>
            </div>
            <div class="col-md-4 col-lg-4 col-offset-6">
              <base-button type="secondary" fill @click="onSign">Sign Up Now</base-button>
            </div>
          </div>

        </div>
      </div>
    </card>

  </div>
</template>

<script>
  import config from '@/config';
  import APIUtil from '@/services/APIUtil';


  export default {
    name: "Login",
    data() {
      return {
        userData:{
          user_name: '',
          user_pwd: '',
        }
      }
    },
    methods: {
      onLogin: function () {
        APIUtil.get('/User/?User.user_name='+this.userData.user_name
        ).then(response =>{
            if (response.data !== undefined) {
              var body = response.data.User[0]
              if (this.userData.user_pwd === body.user_pwd) {
                console.log("登陆成功")
                //TODO: 跳转到主页
                sessionStorage.userName = body.user_name
                sessionStorage.userId = body.id
                this.$router.push({
                  path: '/',
                })
              } else {
                alert("密码不正确")
                console.log("密码不正确")
              }
            } else {
              alert("用户不存在")
              console.log("用户不存在")
            }
          }
        )
      },
      onSign: function() {
        this.$router.push({
          path: '/signup',
        })
      }
    }
  }
</script>

<style scoped>

</style>
