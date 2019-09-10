<template>
  <transition name="slide">
    <aside v-if="show" class="cookiesWrapper">
      <span>Ta strona wykorzystuje pliki cookies do poprawnego funkcjonowania.</span>
      <button @click="closeInfo" class="btn btn--primary">Cool</button>
    </aside>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: true
    };
  },
  methods: {
    closeInfo() {
      this.show = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.cookiesWrapper {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  width: 100%;
  bottom: 0;
  background: #424851;
  color: #fff;
  padding: 20px;
  span {
    padding-right: 15px;
  }
}
</style>