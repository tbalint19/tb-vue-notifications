<template>
  <div id="notifications">
    <NotificationMessage
      v-for="msg in notifications"
      :key="msg.id"
      :bus="bus"
      :id="msg.id"
      :type="msg.type"
      :text="msg.text">
    </NotificationMessage>
  </div>
</template>

<script>
import Vue from 'vue'
import NotificationMessage from './notification-message.vue'

export default {
  name: 'NotificationsRoot',
  data() {
    return {
      bus: new Vue({}),
      notifications: []
    }
  },
  methods: {
    delMsg: function(id) {
      this.notifications = this.notifications.filter(msg => msg.id !== id)
    },
    addMsg: function(msg) {
      this.notifications.push(msg)
    }
  },
  created() {
    this.$notifications.$on('Notification added', msg => this.addMsg(msg))
    this.$notifications.$on('Notification deleted', id => this.delMsg(id))
  },
  components: {
    NotificationMessage
  }
}
</script>

<style scoped>
#notifications {
  position: fixed;
  z-index: 200;
  top: 65px;
  right: 65px;
  width: 300px;
}
</style>
