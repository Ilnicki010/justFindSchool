<template>
  <router-link :to="'/szkola/' + school.uid">
    <div v-if="loaded" class="schoolItemWrapper">
      <div class="main-part">
        <div class="image" v-lazy:background-image="school.images[0]"></div>
        <div class="content">
          <h4>{{school.name}}</h4>
          <p>{{school.adress}} {{school.city}}</p>
        </div>
      </div>
      <rate-knobs
        class="knobs"
        v-if="school.ratesAvg"
        :rateValues="school.ratesAvg"
        :shorter="true"
      />
    </div>
  </router-link>
</template>

<script>
import rateKnobs from "@/components/rateKnobs";
import { setTimeout } from "timers";
export default {
  props: {
    school: {
      require: true,
      default: {},
      type: Object
    }
  },
  data() {
    return {
      loaded: false
    };
  },
  components: {
    rateKnobs
  },
  mounted() {
    setTimeout(() => {
      this.loaded = true;
    }, 0);
  }
};
</script>

<style lang="scss" scoped>
.preloader {
  box-shadow: 0 3px 3px rgba(#000, 0.2);
  border-radius: 5px;
  margin-bottom: 4vh;
}
.schoolItemWrapper {
  box-shadow: 0 3px 3px rgba(#000, 0.2);
  border-radius: 5px;
  margin-bottom: 4vh;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .main-part {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 120px;
    .image {
      width: 100px;
      height: 100%;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 5px 0 0 5px;
    }
    .content {
      padding: 0 20px;
      flex: 3;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-around;
      h4,
      p {
        margin: 0;
      }
    }
  }
  .knobs {
    margin: 30px;
  }
}
@media (min-width: 720px) {
  .schoolItemWrapper {
    flex-direction: column;
    margin: 20px;
    width: 25vw;
    transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
    &:hover {
      transform: scale(1.02);
      box-shadow: 0 3px 20px rgba(#000, 0.2);
    }
    .main-part {
      height: 200px;
      width: 100%;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      .content {
        padding: 15px 0 10px 30px;
      }
      .image {
        width: 100%;
        height: 60%;
        border-radius: 5px 5px 0 0;
      }
    }
  }
}
</style>