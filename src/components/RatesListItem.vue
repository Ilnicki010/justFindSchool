<template>
  <div class="rate">
    <rate-knobs class="rate__knobs" :rate-values="rate" />
    <p class="rate__content">
      <span>{{ rate.content }}</span>
    </p>
    <div class="rate__info">
      <span class="info__date">Dodano: {{ getFullDate(rate.created_at) }}</span>
      <div v-if="rate.user_class !== 'none'">
        <span v-if="isClass(rate.user_class)" class="info__class">Uczeń klasy {{ rate.user_class }}</span>
        <span v-else class="info__class">{{ rate.user_class }}</span>
      </div>
    </div>
    <img class="pattern" src="@/assets/pattern.svg" alt="pattern" />
  </div>
</template>

<script>
import moment from "moment";
import RateKnobs from "@/components/RateKnobs";
export default {
  components: {
    RateKnobs
  },
  props: {
    rate: {
      type: Object,
      default: null,
      required: true
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
.rate {
  padding: 20px;
  box-shadow: 0 5px 10px rgba($black, 0.2);
  margin-bottom: 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: $white;
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
      border-bottom: $primary 1px solid;
      color: $primary;
    }
  }
  .rate__content {
    padding: 5px 10px 0;
  }
}
@media (min-width: 720px) {
  .rate {
    margin: 20px;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    position: relative;

    .rate__knobs {
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
        border: $primary 1px solid;
        border-radius: 3px;
        color: $primary;
      }
      .info__date {
        white-space: nowrap;
      }
    }
    .rate__content {
      flex: 4;
      margin: 0 20px;
      padding: 0 10px;
      border-left: 1px solid $primary;
    }
  }
}
</style>