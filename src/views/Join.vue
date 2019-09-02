<template>
  <div class="joinWrapper">test</div>
</template>
<script>
require("clientjs");
export default {
  data() {
    return {};
  },
  mounted() {
    let client = new ClientJS();
    let print = client.getFingerprint();
  }
};
</script>
<style lang="scss" scoped>
</style>
