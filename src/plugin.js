import Vue from 'vue'
import NotificationsRoot from './notification-root.vue'

export default class NotificationPlugin {

  static NOTIFICATION_CONTROLLER = new Vue({
    data: {
      notificationCounter: 0
    },
    methods: {
      report: function(text) {
        let id = this.notificationCounter
        this.notificationCounter++
        this.$emit("Notification added", {id, text, type: "success"})
      },
      note: function(text) {
        let id = this.notificationCounter
        this.notificationCounter++
        this.$emit("Notification added", {id, text, type: "secondary"})
      },
      warn: function(text) {
        let id = this.notificationCounter
        this.notificationCounter++
        this.$emit("Notification added", {id, text, type: "danger"})
      },
      delMsg: function(id) {
        this.$emit("Notification deleted", id)
      }
    }
  })

  static install(Vue, options) {

   Vue.prototype.$report = NotificationPlugin.NOTIFICATION_CONTROLLER.report
   Vue.prototype.$note = NotificationPlugin.NOTIFICATION_CONTROLLER.note
   Vue.prototype.$warn = NotificationPlugin.NOTIFICATION_CONTROLLER.warn
   Vue.prototype.$delMsg = NotificationPlugin.NOTIFICATION_CONTROLLER.delMsg

   Vue.prototype.$notifications = NotificationPlugin.NOTIFICATION_CONTROLLER

   Vue.component('notifications-root', NotificationsRoot);
  }

}
