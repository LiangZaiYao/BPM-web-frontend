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
                    placeholder="Full Name"
                    v-model="info.name">
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
                    v-model="user_name"
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
    data() {
      return {
        user_name: '',
        isNewUser: false,
        info: {
          name: '',
          company: '',
          position: '',
          phone_number: '',
          email: '',
          address: ''
        },
        requestBody: {
          create_time: '',
          user: {
            id: '',
            type: 'User'
          },
          card: {
            id: '',
            type: 'Card'
          }
        }
      }
    },
    methods: {
      isEmptyObject: function (obj) {
        if (Object.keys(obj).length == 0) {
          return true
        }
        return false
      },
      onSave: function () {
        // save personal information
        var cardId = ''
        if (this.isNewUser) {          // 如果原本没有个人信息，则使用post进行创建
          APIUtil.post('/Card/', this.info
          ).then(response => {
            cardId = response.data.id
          }).catch(() => {
            alert('card信息保存失败')
          }).then(() => {
            // 用返回的cardId来创建一个UserCard
            this.requestBody.create_time = new Date().valueOf()
            this.requestBody.user.id = sessionStorage.userId
            this.requestBody.card.id = cardId
            APIUtil.post('/Usercard/', this.requestBody
            ).then(response => {
              console.log(response)
              alert('用户信息保存成功')
            }).catch(() => {
              alert('UserCard信息保存失败')
            })
          })
        }
        else {          // 如果已经有个人信息，则使用put进行修改
          APIUtil.get('Usercard/?Usercard.user.id=' + sessionStorage.userId
          ).then(response => {
            cardId = response.data.Usercard[0].card.id
          }).catch(() => {
            console.log('读取UserCard失败')
          }).then(() => {
            // 根据查到的UserCard中的cardId来对个人信息进行put更新
              APIUtil.put('/Card/' + cardId, this.info
              ).then(response => {
                console.log(response)
                alert("修改信息成功")
              }).catch(() => {
                alert('修改信息失败')
              })
            })
        }
      },
      loadInfo: function () {
        this.user_name = sessionStorage.userName
        APIUtil.get('/UserCard/?Usercard.user.id=' + sessionStorage.userId
          // APIUtil.get('/UserCard/?Usercard.user.id=1544099676976'
        ).then(response => {
          if (this.isEmptyObject(response.data)) {
            // 没有个人信息的情况
            alert("请填写个人信息")
            this.isNewUser = true
          }
          else {
            // 若有，则填充个人信息到页面
            var UserCard = response.data.Usercard[0]
            this.info = UserCard.card
            this.isNewUser = false
          }
        }).catch(() => {
          alert('读取信息失败')
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
