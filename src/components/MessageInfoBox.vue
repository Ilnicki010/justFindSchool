<template>
  <div
    class="message"
    :class="{ 'message--error': messageType.error, 'message--success': messageType.success }"
  >
    <span>{{ messageValue }}</span>
  </div>
</template>

<script>
export default {
  props: {
    messageType: {
      error: {
        type: Boolean,
        default: false
      },
      success: {
        type: Boolean,
        default: false
      }
    },
    messageValue: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      loaded: false
    };
  },
  beforeDestroy() {
    this.show = false;
  }
};
</script>

<style lang="scss" scoped>
.message {
  position: absolute;
  bottom: 100px;
  left: 0;
  right: 0;
  margin: auto;
  width: 80%;
  z-index: 9999;
  color: $white;
  border-radius: 6px;
  padding: 20px;
}
.message--error {
  background: #f14848;
  box-shadow: 0 10px 15px rgba(#f14848, 0.2);
}
.message--success {
  background: $primary;
  box-shadow: 0 10px 15px rgba($primary, 0.2);
}
</style>
