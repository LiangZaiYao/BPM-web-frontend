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
  export default {
    name: "EditTopic",
    components: {
      Uploader
    },
    data() {
      return {
        maxSize: 3072,
        formData_pic: FormData
      }
    },
    methods: {
      onPost:function () {
        console.log(this.formData_pic.entries().next())

      },
      onCancel:function () {
        this.$router.go(-1)
      },
      getFormData:function (fd) {
        this.formData_pic = fd
      }
    }
  }
</script>

<style scoped>

</style>
