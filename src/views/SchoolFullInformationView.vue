<template>
  <div v-if="school" id="fullInfoWrapper" class="fullinfo-wrapper">
    <header
      id="header"
      class="fullinfo-header"
      :style="{ backgroundImage: `url(${school.images[0]})` }"
    >
      <h1>{{ school.name }}</h1>
      <div class="icons">
        <span>{{ school.adress }} | {{ school.city }}</span>
      </div>
    </header>
    <main class="content-wrapper">
      <button
        class="btn btn--primary btn--rounded"
        :class="{ inactive: oldUser }"
        @click="openModal"
      >Dodaj anonimową opinię</button>
      <div class="content-wrapper__content">
        <rate-knobs v-if="school.ratesAvg" class="rateAvg-knobs" :rate-values="school.ratesAvg" />
        <section v-if="ratesLoaded" class="all-rates">
          <h2>Opinie ({{ allRates.length }})</h2>
          <transition name="slide">
            <rates-list v-if="allRates.length > 0" :all-rates="allRates" />
            <div v-else class="empty">
              <img class="icon" src="@/assets/no_data.svg" alt="empty icon" />
            </div>
          </transition>
        </section>
        <base-loader v-else />
      </div>
    </main>
    <transition name="slide-fast">
      <add-rate-modal
        v-if="rateModal"
        :school="school"
        @updateRatesList="getRates"
        @addedOpinion="isUserNew"
        @closeModal="closeModal"
      />
    </transition>
    <transition name="slide">
      <message-info-box
        v-if="showMessage"
        :message-type="message.type"
        :message-value="message.value"
      />
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import { setTimeout } from "timers";
import RateKnobs from "@/components/RateKnobs";
import AddRateModal from "@/components/AddRateModal";
import RatesList from "@/components/RatesList";
import BaseLoader from "@/components/BaseLoader";
import MessageInfoBox from "@/components/MessageInfoBox";

const ClientJS = require("clientjs");

const authorizationBasic = window.btoa(
  `${"admin" + ":"}${process.env.VUE_APP_API_KEY}`
);
const config = {
  headers: { Authorization: `Basic ${authorizationBasic}` }
};
export default {
  components: {
    RateKnobs,
    AddRateModal,
    RatesList,
    MessageInfoBox,
    BaseLoader
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
      allRates: [],
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
      },
      ratesLoaded: false
    };
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
    this.loaded = true;
    if (!this.userPrint) {
      const client = new ClientJS();
      setTimeout(() => {
        this.userPrint = client.getFingerprint();
      }, 500);
    } else {
      this.isUserNew();
    }
    this.getSchool();
  },
  methods: {
    getSchool() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/schools?uid=${this.uid}`, config)
        .then(data => {
          this.school = data.data[0];
        });
    },
    getRates() {
      axios
        .get(
          `${process.env.VUE_APP_API_URL}/rates/school/${this.school._id}`,
          config
        )
        .then(data => {
          this.allRates = data.data;
          this.ratesLoaded = true;
        });
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
          `${process.env.VUE_APP_API_URL}/rates/userprint/${this.userPrint}`,
          config
        )
        .then(data => {
          if (data.data.length === 0) {
            this.oldUser = false;
          } else {
            this.oldUser = true;
          }
        });
    }
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
    color: $white;
    .icons {
      display: flex;
      justify-content: center;
      width: 100%;
      z-index: 999999;
      .icon {
        color: $white;
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
        rgba($black, 0.6),
        rgba($black, 0.2)
      );
      z-index: 999;
    }
  }
  .content-wrapper {
    margin-top: 40vh;
    min-height: 100vh;
    z-index: 999;
    background: $white;
    padding: 20px;
    box-shadow: 0 -5px 20px rgba($black, 0.9);
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
      background: linear-gradient(to left, $primary-dark, $primary-dark);
      animation: shake 5s infinite linear;
      transition: 0.4s linear;
    }
    .inactive {
      background: $black;
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
