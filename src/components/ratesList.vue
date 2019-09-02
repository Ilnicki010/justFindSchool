<template>
  <div class="ratesWrapper">
    <div class="rate" v-for="rate in ratesArr" :key="rate._id">
      <rate-knobs class="knobsWrapper" :rateValues="rate" />
      <p class="rate__content">
        <span>{{rate.content}}</span>
      </p>
      <span class="rate__date">Dodano: {{getFullDate(rate.created_at)}}</span>
    </div>
  </div>
</template>

<script>
import rateKnobs from "@/components/rateKnobs";
export default {
  components: {
    rateKnobs
  },
  props: {
    ratesArr: {
      type: Array,
      required: true
    }
  },
  methods: {
    getFullDate(date) {
      let newDate = new Date(date);
      return `${newDate.getDay()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.ratesWrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  .rate {
    padding: 20px;
    box-shadow: 0 5px 10px rgba(#000, 0.2);
    margin-bottom: 30px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    .rate__date {
      opacity: 0.7;
      font-size: 0.8rem;
      padding-left: 10px;
    }
    .rate__content {
      padding: 5px 10px 0;
    }
  }
  // &::after {
  //   content: "\201D";
  //   position: absolute;
  //   top: -150px;
  //   right: -60px;
  //   color: #16dea3;
  //   font-size: 30rem;
  //   z-index: -9999999;
  //   line-height: 1;
  //   letter-spacing: 0;
  // }
}
@media (min-width: 720px) {
  .ratesWrapper {
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    z-index: 999;
    .rate {
      margin: 20px;
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      position: relative;
      .knobsWrapper {
        flex: 3;
      }
      .rate__date {
        flex: 1;
      }
      .rate__content {
        flex: 4;
        margin: 0 20px;
        padding: 0 10px;
        span {
          border-bottom: 1px dotted #16dea3;
        }
      }
    }
  }
}
</style>