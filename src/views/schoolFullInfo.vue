<template>
  <div v-if="school" class="fullinfo-wrapper" id="fullInfoWrapper">
    <header
      id="header"
      class="fullinfo-header"
      :style="{ backgroundImage: 'url(' + school.images[0] + ')' }"
    >
      <h1>{{school.name}}</h1>
    </header>
    <div class="content-wrapper">
      <button @click="openModal" class="btn btn--primary btn--rounded">Dodaj anonimową opinię</button>
      <div class="content-wrapper__content">
        <rate-knobs class="rateAvg-knobs" v-if="school.ratesAvg" :rateValues="school.ratesAvg" />
        <div class="all-rates">
          <h2>Opinie ({{ratesArr.length}})</h2>
          <rates-list :ratesArr="ratesArr" />
        </div>
      </div>
    </div>
    <transition name="slide">
      <add-rate-modal
        :school="school"
        @updateRatesList="getRates"
        @closeModal="closeModal"
        v-if="rateModal"
      />
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import rateKnobs from "@/components/rateKnobs";
import addRateModal from "@/components/addRateModal";
import ratesList from "@/components/ratesList";
let i = 0;
let last = 0;
export default {
  components: {
    rateKnobs,
    addRateModal,
    ratesList
  },
  props: {
    uid: {
      type: String,
      required: true,
      default: ""
    }
  },
  data() {
    return {
      school: null,
      ratesArr: [],
      rateModal: false
    };
  },
  methods: {
    getSchool() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/schools?uid=${this.uid}`)
        .then(data => {
          this.school = data.data[0];
        });
    },
    getRates() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/rates/school/${this.school._id}`)
        .then(data => {
          this.ratesArr = data.data;
        });
    },
    onScroll(e) {
      document.querySelector("#header").style.filter = `blur(${window.scrollY /
        40}px)`;
      last = window.scrollY;
    },
    openModal() {
      this.rateModal = true;
    },
    closeModal() {
      this.rateModal = false;
    }
  },
  watch: {
    school() {
      this.getRates();
    }
  },
  mounted() {
    this.getSchool();
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  }
};
</script>

<style lang="scss" scoped>
.fullinfo-wrapper {
  display: flex;
  flex-direction: column;
  .fullinfo-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 30vh;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    position: fixed;
    top: 0;
    left: 0;
    color: #fff;
    h1,
    p {
      z-index: 9999;
      padding: 0 20px;
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(
        to top,
        rgba(#000, 0.4),
        rgba(#000, 0.2)
      );
      z-index: 999;
    }
  }
  .content-wrapper {
    margin-top: 30vh;
    z-index: 999;
    background: #fff;
    padding: 20px;
    .btn {
      position: absolute;
      top: calc(30vh - 20px);
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      height: 40px;
      width: 230px;
    }
    .content-wrapper__content {
      margin-top: 5vh;
      .rateAvg-knobs {
        position: relative;
        width: 100%;
      }
      .all-rates {
        position: relative;
        margin-top: 7vh;
      }
    }
  }
}
@media (min-width: 720px) {
  .fullinfo-wrapper {
    .fullinfo-header {
      height: 45vh;
    }
    .content-wrapper {
      padding: 50px 100px;
      margin-top: 45vh;
      .btn {
        top: calc(45vh - 20px);
      }
      .content-wrapper__content {
        .rateAvg-knobs {
          min-height: 20vh;
          &::before {
            content: "Średnia ocen";
            position: absolute;
            top: 0;
            right: 0;
            color: #16dea3;
            z-index: -99999;
            font-size: 1.5rem;
            opacity: 1;
            transform-origin: bottom right;
            transform: rotate(-90deg);
            line-height: 0;
          }
        }
        .all-rates {
          margin-top: 10vh;
          position: relative;
          &::before {
            content: "Wszystkie opinie";
            font-family: "Sacramento", cursive;
            position: absolute;
            top: 0;
            left: 0;
            color: #16dea3;
            font-size: 5rem;
            opacity: 0.6;
            transform-origin: top left;
            line-height: 0;
            transform: rotate(90deg);
            z-index: -999;
          }
        }
      }
    }
  }
}
</style>