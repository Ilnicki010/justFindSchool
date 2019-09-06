<template>
  <router-link :to="'/szkola/' + school.uid">
    <!-- <content-loader
      v-if="!loaded"
      :height="260"
      :width="330"
      :speed="2"
      primaryColor="#f3f3f3"
      secondaryColor="#dbdbdb"
      class="preloader"
    >
      <rect x="97" y="31.2" rx="3" ry="3" width="113.05" height="10.64" />
      <rect x="97" y="13.2" rx="3" ry="3" width="150.45" height="10" />
      <rect x="0" y="0" rx="5" ry="5" width="80" height="80" />
      <rect x="97" y="65.2" rx="3" ry="3" width="80" height="7" />
      <circle cx="165" cy="177" r="40" />
      <circle cx="75" cy="176.9983035961523" r="40" />
      <circle cx="255" cy="177" r="40" />
      <rect x="50" y="235.2" rx="3" ry="3" width="50" height="8" />
      <rect x="140" y="235.2" rx="3" ry="3" width="50" height="8" />
      <rect x="230" y="235.2" rx="3" ry="3" width="50" height="8" />
    </content-loader>-->
    <div v-if="loaded" class="schoolItemWrapper">
      <div class="main-part">
        <div class="image" :style="{ backgroundImage: 'url(' + school.images[0] + ')' }"></div>
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
import { ContentLoader } from "vue-content-loader";
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
    rateKnobs,
    ContentLoader
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