<template>
  <transition name="slide">
    <div v-if="show" class="cookies-wrapper">
      <span>Ta strona wykorzystuje pliki cookies do poprawnego funkcjonowania.</span>
      <button class="btn btn--primary" @click="() => (show = false)">Cool</button>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: true
    };
  }
};
</script>

<style lang="scss" scoped>
.cookies-wrapper {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: $small;
  width: 100%;
  z-index: 99999;
  bottom: 0;
  background: $deep-dark;
  color: $white;
  padding: 20px;
}
</style>
