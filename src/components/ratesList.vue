<template>
  <div class="ratesWrapper">
    <div class="rate" v-for="rate in ratesArr" :key="rate._id">
      <rate-knobs class="knobsWrapper" :rateValues="rate" />
      <p class="rate__content">
        <span>{{rate.content}}</span>
      </p>
      <span class="rate__date">Dodano: {{getFullDate(rate.created_at)}}</span>
      <img class="pattern" src="../assets/pattern.svg" alt="pattern" />
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
  border-radius: 10px;
  .rate {
    padding: 20px;
    box-shadow: 0 5px 10px rgba(#000, 0.2);
    margin-bottom: 30px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background: #fff;
    .pattern {
      display: none;
    }
    .rate__date {
      opacity: 0.7;
      font-size: 0.8rem;
      padding-left: 10px;
    }
    .rate__content {
      padding: 5px 10px 0;
    }
  }
}
@media (min-width: 720px) {
  .ratesWrapper {
    padding: 20px;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    z-index: 999;
    background: linear-gradient(to right, #16dea3, #0d8561);
    .rate {
      margin: 20px;
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      position: relative;

      .knobsWrapper {
        flex: 3;
      }
      .pattern {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        border-radius: 0 0 0 10px;
      }
      .rate__date {
        flex: 1;
      }
      .rate__content {
        flex: 4;
        margin: 0 20px;
        padding: 0 10px;
        border-left: 1px solid #16dea3;
        // span {
        //   border-bottom: 1px dotted #16dea3;
        // }
      }
    }
  }
}
</style>