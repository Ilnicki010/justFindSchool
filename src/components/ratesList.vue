<template>
  <div class="ratesWrapper">
    <div v-for="rate in ratesArr" :key="rate._id" class="rate">
      <rate-knobs class="knobsWrapper" :rate-values="rate" />
      <p class="rate__content">
        <span>{{ rate.content }}</span>
      </p>
      <div class="rate__info">
        <span class="info__date">Dodano: {{ getFullDate(rate.created_at) }}</span>
        <div v-if="rate.user_class !== 'none'">
          <span v-if="isClass(rate.user_class)" class="info__class"
            >Uczeń klasy {{ rate.user_class }}</span
          >
          <span v-else class="info__class">{{ rate.user_class }}</span>
        </div>
      </div>

      <img class="pattern" src="../assets/pattern.svg" alt="pattern" />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import rateKnobs from "@/components/rateKnobs";

export default {
  components: {
    rateKnobs
  },
  props: {
    ratesArr: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    getFullDate(date) {
      return moment(date).format("DD MM YYYY");
    },
    isClass(user_class) {
      if (user_class === "I" || user_class === "II" || user_class === "III") {
        return true;
      }
      if (user_class === "Rodzic" || user_class === "Absolwent") {
        return false;
      }
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
    .rate__info {
      display: flex;
      width: 100%;
      justify-content: space-between;
      .info__date,
      .info__class {
        opacity: 0.7;
        font-size: 0.8rem;
        padding: 5px;
      }

      .info__class {
        border-bottom: #16dea3 1px solid;
        color: #16dea3;
      }
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
      .rate__info {
        flex: 1;
        display: flex;
        flex-direction: column-reverse;
        text-align: center;
        align-items: center;
        .info__class {
          border: #16dea3 1px solid;
          border-radius: 3px;
          color: #16dea3;
        }
        .info__date {
          white-space: nowrap;
        }
      }
      .rate__content {
        flex: 4;
        margin: 0 20px;
        padding: 0 10px;
        border-left: 1px solid #16dea3;
      }
    }
  }
}
</style>
