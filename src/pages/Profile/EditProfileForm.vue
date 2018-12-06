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
                  v-model="info.phone_number"
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
  export default {
    props: {
      info: {
        type: Object,
        default: () => {
          return {};
        }
      },
      methods: {
        onSave:function () {
          // save personal info
          this.$toasted.show("good")
        }
      },
      mounted() {
        APIUtil.get('/Card/?name=1'
        ).then(data => {
          this.info = data
        }).catch(() => {
          this.showToast(this.$t('读取信息失败'))
        }).finally(() => {
          // do nothing
        })
      }
    }
  }
</script>
<style>
</style>
