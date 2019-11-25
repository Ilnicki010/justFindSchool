<template>
  <router-link :to="'/szkola/' + school.uid" class="schoolItemWrapper">
    <div v-if="school.label" class="labels">
      <span v-if="school.label === 'most-rated'" class="labels__fire">Najwięcej opinii</span>
      <span v-if="school.label === 'longest-rates'" class="labels__longest">Najdłuższe opinie</span>
    </div>
    <div class="main-part">
      <div v-lazy:background-image="school.images[0]" class="image"></div>
      <div class="content">
        <h4>{{ school.name }}</h4>
        <p>{{ school.adress }} {{ school.city }}</p>
        <span v-if="school.rates.length > 0" class="rates-counter">{{ school.rates.length }} Opinii</span>
        <span v-else class="rates-counter">Dodaj pierwszą opinie!</span>
      </div>
    </div>
    <div class="knobsWrapper">
      <rate-knobs
        v-if="school.ratesAvg"
        class="knobs"
        :rate-values="school.ratesAvg"
        :shorter="true"
      />
    </div>
  </router-link>
</template>

<script>
import rateKnobs from "@/components/rateKnobs";

export default {
  components: {
    rateKnobs
  },
  props: {
    school: {
      require: true,
      default: null,
      type: Object
    }
  },
  data() {
    return {
      loaded: false
    };
  },
  mounted() {
    this.loaded = true;
  }
};
</script>

<style lang="scss" scoped>
.preloader {
  box-shadow: 0 3px 3px rgba($black, 0.2);
  border-radius: 5px;
  margin-bottom: 4vh;
}
.schoolItemWrapper {
  box-shadow: 0 3px 3px rgba($black, 0.2);
  border-radius: 5px;
  margin-bottom: 4vh;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  .labels {
    position: absolute;
    top: -10px;
    left: 5px;
    .labels__fire,
    .labels__longest {
      background: #424851;
      color: $white;
      padding: 5px 15px;
      font-size: 13px;
      border-radius: 50px;
      margin-right: 10px;
    }
  }
  .main-part {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 120px;
    .image {
      width: 100px;
      height: 100%;
      flex: 1;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 5px 0 0 5px;
    }
    .content {
      padding: 20px;
      flex: 2;
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: space-around;
      h4,
      p {
        margin: 0;
      }
      h4 {
        flex: 3;
      }
      p {
        flex: 1;
        font-size: 0.9rem;
        opacity: 0.9;
      }
      span {
        flex: 1;
      }
      .rates-counter {
        color: $primary;
        border-left: 0.8px solid $primary;
        text-align: left;
        padding: 1px 6px;
        font-weight: 100;
        font-size: 0.8rem;
      }
    }
  }

  .knobs {
    margin: 23px 10px;
  }
}

@media (min-width: 720px) {
  .schoolItemWrapper {
    flex-direction: column;
    margin: 20px;
    transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
    &:hover {
      transform: scale(1.02);
      box-shadow: 0 3px 20px rgba($black, 0.2);
    }
    .main-part {
      height: 200px;
      width: 100%;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      .content {
        flex: 1;
        padding: 15px 10px 10px 30px;
      }
      .image {
        flex: 2;
        width: 100%;
        height: 60%;
        border-radius: 5px 5px 0 0;
      }
    }
  }
}
</style>
