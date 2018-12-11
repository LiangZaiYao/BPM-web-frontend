<template>
  <card>
    <h5 slot="header" class="title">Edit Profile</h5>
    <div class="row">
      <div class="col-md-8 pr-md-1">
        <base-input label="Company"
                  placeholder="Company"
                  v-model="info.company">
        </base-input>
      </div>
      <div class="col-md-4 pl-md-1">
        <base-input label="Position"
                  placeholder="Position"
                  v-model="info.position">
        </base-input>
      </div>

    </div>
    <div class="row">
      <div class="col-md-4 pr-md-1">
        <base-input label="Full Name"
                  v-model="info.name"
                  placeholder="Full Name">
        </base-input>
      </div>
      <div class="col-md-4 px-md-1">
        <base-input label="Phone Number"
                  v-model="info.phoneNumber"
                  placeholder="Phone Number">
        </base-input>
      </div>
      <div class="col-md-4 pl-md-1">
        <base-input label="Username"
                    placeholder="Username"
                    v-model="info.username"
                    disabled>
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 pm-md-1">
        <base-input label="Email address"
                    type="email"
                    v-model="info.email"
                    placeholder="youraddress@email.com">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <base-input>
          <label>Contact Address</label>
          <textarea rows="4" cols="80"
                    class="form-control"
                    placeholder="Here can be your address"
                    v-model="info.address">
          </textarea>
        </base-input>
      </div>
    </div>
    <base-button slot="footer" type="primary" fill @click="onSave">Save</base-button>
  </card>
</template>
<script>
  import APIUtil from '@/services/APIUtil';

  export default {
    props: {
      info: {
        type: Object,
        default: () => {
          return {};
        }
      },
    },
    data() {
      return {

      }
    },
    methods: {
      onSave: function() {
        // save personal info
        console.log(this.info)
        console.log(sessionStorage)
        APIUtil.post('/UserCard/?Usercard.name='+sessionStorage.userName,this.info
        ).then(response => {
          console.log(response)
        }).catch(() => {
          this.showToast('保存失败')
        }).finally(() => {
          // do nothing
        })
      },
      loadInfo: function() {
        // TODO
        APIUtil.get('/UserCard/?Usercard.User.name='+sessionStorage.userName
        ).then(data => {
          console.log(data)
          this.info = data
        }).catch(() => {
          this.showToast('读取信息失败')
        }).finally(() => {
          // do nothing
        })
      },
    },
    mounted() {
      this.loadInfo()
    }
  }
</script>
<style>
</style>
