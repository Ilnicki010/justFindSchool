<template>
  <div v-if="school" class="fullinfo-wrapper" id="fullInfoWrapper">
    <header
      id="header"
      class="fullinfo-header"
      :style="{ backgroundImage: 'url(' + school.images[0] + ')' }"
    >
      <h1>{{school.name}}</h1>
      <div class="icons">
        <span>{{school.adress}} | {{school.city}}</span>
      </div>
    </header>
    <div v-if="loaded" class="content-wrapper">
      <button
        @click="openModal"
        class="btn btn--primary btn--rounded"
        :class="{inactive:oldUser}"
      >Dodaj anonimową opinię</button>
      <div class="content-wrapper__content">
        <rate-knobs class="rateAvg-knobs" v-if="school.ratesAvg" :rateValues="school.ratesAvg" />
        <div class="all-rates">
          <h2>Opinie ({{ratesArr.length}})</h2>
          <transition name="slide">
            <rates-list v-if="ratesArr.length > 0" :ratesArr="ratesArr" />
            <div v-else class="empty">
              <img class="icon" src="../assets/no_data.svg" alt="empty icon" />
            </div>
          </transition>
        </div>
      </div>
    </div>
    <transition name="slide-fast">
      <add-rate-modal
        :school="school"
        @updateRatesList="getRates"
        @addedOpinion="isUserNew"
        @closeModal="closeModal"
        v-if="rateModal"
      />
    </transition>
    <transition name="slide">
      <message-component
        v-if="showMessage"
        :messageType="message.type"
        :messageValue="message.value"
      />
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import rateKnobs from "@/components/rateKnobs";
import addRateModal from "@/components/addRateModal";
import ratesList from "@/components/ratesList";
import messageComponent from "@/components/messageComponent";
import { setTimeout } from "timers";
require("clientjs");
let i = 0;
let last = 0;
export default {
  components: {
    rateKnobs,
    addRateModal,
    ratesList,
    messageComponent
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
      rateModal: false,
      loaded: false,
      userPrint: "",
      oldUser: false,
      showMessage: false,
      message: {
        type: {
          error: null,
          success: null
        },
        value: ""
      }
    };
  },
  methods: {
    getSchool() {
      axios
        .get(`https://school-248910.appspot.com/schools?uid=${this.uid}`)
        .then(data => {
          this.school = data.data[0];
        });
    },
    getRates() {
      axios
        .get(
          `https://school-248910.appspot.com/rates/school/${this.school._id}`
        )
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
      if (!this.oldUser) {
        this.rateModal = true;
        document.body.style.overflowY = "hidden";
      } else {
        this.showMessage = true;
        this.message.type.error = true;
        this.message.value =
          "W trosce o wiarygodnośc mozesz wystawic tylko 1 opinię 1 szkole";
        setTimeout(() => {
          this.showMessage = false;
        }, 2500);
      }
    },
    closeModal() {
      this.rateModal = false;
      document.body.style.overflowY = "scroll";
    },
    isUserNew() {
      axios
        .get(
          `https://school-248910.appspot.com/rates/userprint/${this.userPrint}`
        )
        .then(data => {
          console.log(data.data);
          if (data.data.length === 0) {
            this.oldUser = false;
          } else {
            this.oldUser = true;
          }
        });
    }
  },
  watch: {
    school() {
      this.getRates();
    },
    userPrint() {
      this.isUserNew();
    }
  },
  mounted() {
    if (!this.userPrint) {
      let client = new ClientJS();
      setTimeout(() => {
        this.userPrint = client.getFingerprint();
      }, 500);
    } else {
      this.isUserNew();
    }

    this.loaded = true;
    this.getSchool();
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
    height: 40vh;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    position: fixed;
    top: 0;
    left: 0;
    color: #fff;
    .icons {
      display: flex;
      justify-content: center;
      width: 100%;
      z-index: 999999;
      .icon {
        color: #fff;
      }
    }
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
        rgba(#000, 0.6),
        rgba(#000, 0.2)
      );
      z-index: 999;
    }
  }
  .content-wrapper {
    margin-top: 40vh;
    min-height: 100vh;
    z-index: 999;
    background: #fff;
    padding: 20px;
    box-shadow: 0 -5px 20px rgba(#000, 0.9);
    .btn {
      position: absolute;
      top: calc(40vh - 20px);
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      height: 40px;
      width: 230px;
      border: none;
      background: linear-gradient(to left, #0d8561, #0d8561);
      animation: shake 5s infinite linear;
      transition: 0.4s linear;
    }
    .inactive {
      background: #000;
      animation: none;
      display: flex;
      justify-content: space-around;
      cursor: default;
      &::after {
        content: url("../assets/lock-icon.svg");
        position: relative;
      }
    }

    .content-wrapper__content {
      margin-top: 5vh;
      position: relative;
      height: 100%;
      .empty {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .icon {
          width: 40vw;
        }
      }
      .rateAvg-knobs {
        position: relative;
        width: 100%;
      }
      .all-rates {
        position: relative;
        margin-top: 7vh;
        height: 100%;
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
          position: relative;
          min-height: 20vh;
        }
        .all-rates {
          margin-top: 10vh;
          position: relative;
        }
      }
    }
  }
}
</style>