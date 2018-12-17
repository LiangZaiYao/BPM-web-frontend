<template>
  <div>
    <div class="row">
      <div class="col-md-10">
        <base-input>
          <label>New Topic</label>
          <textarea rows="4" cols="80"
                    class="form-control text-input"
                    placeholder="Hey, what's new ?"
                    style="height: 300px"
                    v-model="topicBody.text"
                    >
          </textarea>
        </base-input>
      </div>
    </div>

    <div class="row">
      <div class="image-uploader col-md-10">
        <!--图片上传-->
        <uploader v-on:getFormData="getFormData"> </uploader>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <base-button type="primary" fill @click="onPost">Post!</base-button>
      </div>
      <div class="col-md-4 col-md-offset-8">
        <base-button type="secondary" fill @click="onCancel">Cancel</base-button>
      </div>
    </div>
  </div>

</template>

<script>
  import Uploader from '../../components/Uploader'
  import APIUtil from '@/services/APIUtil';

  export default {
    name: "EditTopic",
    components: {
      Uploader
    },
    data() {
      return {
        maxSize: 3072,
        formData_pic: FormData,
        topicBody: {
          text: '',
          user_id: '',
          create_time: 0,
          image: ''
        },
      }
    },
    methods: {
      onPost:function () {
        // console.log(this.formData_pic.entries().next())
        if(sessionStorage.userId === undefined){
          alert("大哥，还没登陆")
          return
        }
        this.topicBody.create_time = new Date().valueOf()
        this.topicBody.user_id = sessionStorage.userId
        var topicId = 0
        // 先用post向Entity创建一个Topic实体
        APIUtil.post('/Topic',this.topicBody
        ).then(response => {
          topicId = response.data.id
          // Topic实体创建好之后根据Topic的id，关联一个文件（FormData）
          APIUtil.post('/Uploadpic/'+topicId, this.formData_pic
          ).then(response => {
            console.log(response)
            alert("话题发布成功！")
            this.$router.push({
              path: 'topics',
            })
          }).catch(() => {
            console.log('图片表单数据关联失败')
          })
        }).catch(() => {
          console.log('Topic创建失败')
        })

      },
      onCancel:function () {
        this.$router.go(-1)
      },
      getFormData:function (fd) {
        // 获得来自子控件的表单数据
        this.formData_pic = fd
      }
    }
  }
</script>

<style scoped>

</style>
