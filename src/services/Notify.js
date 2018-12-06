import Vue from 'vue'
import Notification from '@/components/NotificationPlugin'
import SuccessTemplate from '@/pages/Notifications/Notification_Success.vue'
import FailTemplate from '@/pages/Notifications/Notification_Fail.vue'
import { BaseAlert } from '@/components';

/*
 *
 * TODO: 还无法使$notify
 *
 */
export default {
  notifySuccess() {
    console.log("success")
    this.$notify({
      component: SuccessTemplate,
      icon: "tim-icons icon-bell-55",
      horizontalAlign: "bottom",
      verticalAlign: "center",
      type: "success",
      timeout: 1000 //提示消失的时间，若为0则一直保留
    });
  },



  notifyFail() {
    console.log("fail")
    this.$notify({
      component: FailTemplate,
      icon: "tim-icons icon-bell-55",
      horizontalAlign: "bottom",
      verticalAlign: "center",
      type: "danger",
      timeout: 1000 //提示消失的时间，若为0则一直保留
    });
  }


}
