<template>
  <div class="ratesWrapper">
    <rates-list-item v-for="rate in allRates" :key="rate._id" :rate="rate" />
  </div>
</template>

<script>
import RatesListItem from "@/components/RatesListItem.vue";

export default {
  components: {
    RatesListItem
  },
  props: {
    allRates: {
      type: Array,
      required: true,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
.ratesWrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 10px;
}
@media (min-width: 720px) {
  .ratesWrapper {
    padding: 20px;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    z-index: 999;
    background: linear-gradient(to right, $primary, $primary-dark);
  }
}
</style>
