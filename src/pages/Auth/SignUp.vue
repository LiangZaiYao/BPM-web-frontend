<template>
  <div>
    <card>
      <h4 slot="header">Signing up</h4>
      <div class="row">
        <div class="col-lg-8 ml-auto mr-auto">
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
                          v-model="userData.user_pwd">
              </base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <base-button type="danger" fill @click="onSignUp">Sign Up</base-button>
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
    name: "SignUp",
    data() {
      return {
        userData:{
          user_name: '',
          user_pwd: '',
          role: 'common',
        }
      }
    },
    computed: {

    },
    methods: {
      onSignUp: function() {
        APIUtil.get('/User/?User.user_name='+this.userData.user_name
        ).then(response =>{
          if (response !== {}) {
            alert("用户已存在")
          }
          }
        )

        APIUtil.post('/User',this.userData
        ).then(response => {
          if (response.status === 200) {
            console.log("注册成功")
          }
        }).catch(() => {
          console.log("注册失败")
        }).finally(() => {
          // do nothing
        });

      }
    }
  }
</script>

<style scoped>

</style>
