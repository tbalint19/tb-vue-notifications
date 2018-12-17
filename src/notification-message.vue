<template>
  <div :class="container">
    <div :class="notification">
      <button class="x-button" @click="delMsg(id)">
        <font-awesome-icon icon="share-square"></font-awesome-icon>
      </button>
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationMessage',
  data() {
    return {
      isFlyingAway: false,
      isSliding: false,
      emitted: false
    }
  },
  props: {
    id: Number,
    type: String,
    text: String,
    bus: Object
  },
  methods: {
    delMsg: function(id) {
      if (!this.emitted) {
        this.bus.$emit("StartSliding", this.id)
        this.emitted = true
      }
      this.isFlyingAway = true
      setTimeout(() => this.$delMsg(this.id), 500)
    },
    startSliding: function(id) {
      if (id < this.id) {
        this.isSliding = true
        setTimeout(() => this.isSliding = false, 500)
      }
    }
  },
  computed: {
    notification() {
      return {
        'notification-message': true,
        'bg-success': this.type == 'success',
        'bg-secondary': this.type == 'secondary',
        'bg-danger': this.type == 'danger',
        'msg-arrive': !this.isFlyingAway,
        'msg-remove': this.isFlyingAway
      }
    },
    container() {
      return {
        'sliding': this.isSliding
      }
    }
  },
  created() {
    this.bus.$on("StartSliding", id => this.startSliding(id))
    setTimeout(this.delMsg, 4500)
  }
}
</script>

<style scoped>
.notification-message {
  margin: 20px;
  border-radius: 3px;
  color: white;
  box-shadow: 0 0 5px #555;
  padding: 10px;
  height: 60px;
}

.notification-message p {
  font-size: 0.8rem;
}

.msg-arrive {
  animation: msgArrive 0.5s ease-out forwards;
}

@keyframes msgArrive {
  0% { transform: translateX(300px); opacity: 0; }
  100% { transform: translateX(0px); opacity: 0.9; }
}

.msg-remove {
  animation: msgRemove 0.5s ease-out forwards;
}

@keyframes msgRemove {
  0% { transform: translateX(0px); opacity: 0.9; }
  40% { transform: translateX(50px); opacity: 0; }
  100% { transform: translateX(50px); opacity: 0; }
}

p {
  text-align: justify;
}

.x-button {
  margin: 0 !important !important !important;
  background-color: transparent;
  border: 0;
  padding: 7px;
  float: right;
  cursor: pointer;
  color: white;
}

.x-button:focus {
  outline: 0;
}

.sliding {
  animation: slide 0.5s ease forwards;
}

@keyframes slide {
  0% {transform: translateY(0%);}
  40% {transform: translateY(0%);}
  100% {transform: translateY(-74px);}
}
</style>
