<template>
  <div class="modalWrapper">
    <header class="modal-header">
      <h2>Oceń szkołę</h2>
      <span>Krok {{step}}/2 (całośc zajmie Ci około 15sek)</span>
    </header>
    <div class="steps-wrapper"></div>
    <transition name="slide-left">
      <div v-if="step===1" class="step-one">
        <div class="inputs">
          <div class="inputs__input">
            <label for="addTeachersRate">Nauczyciele</label>
            <div class="input__slider">
              <input
                v-model="rateValues.teachers"
                class="slider__input"
                type="range"
                id="addTeachersRate"
                name="addTeachersRate"
                min="1"
                max="6"
                step="1"
                value="3"
              />
              <span id="teachersValue">{{rateValues.teachers}}</span>
            </div>
          </div>
          <div class="inputs__input">
            <label for="addTeachersRate">Klimat</label>
            <div class="input__slider">
              <input
                v-model="rateValues.flow"
                class="slider__input"
                type="range"
                id="addTeachersRate"
                name="addTeachersRate"
                min="1"
                max="6"
                step="1"
                value="3"
              />
              <span>{{rateValues.flow}}</span>
            </div>
          </div>
          <div class="inputs__input">
            <label for="addTeachersRate">Standard nauczania</label>
            <div class="input__slider">
              <input
                v-model="rateValues.standard"
                class="slider__input"
                type="range"
                id="addTeachersRate"
                name="addTeachersRate"
                min="1"
                max="6"
                step="1"
                value="3"
              />
              <span>{{rateValues.standard}}</span>
            </div>
          </div>
          <div class="inputs__input">
            <label for="addTeachersRate">Dojazd komunikacją miejską</label>
            <div class="input__slider">
              <input
                v-model="rateValues.commute"
                class="slider__input"
                type="range"
                id="addTeachersRate"
                name="addTeachersRate"
                min="1"
                max="6"
                step="1"
                value="3"
              />
              <span>{{rateValues.commute}}</span>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button @click="closeModal" class="btn btn--ghost-red">Anuluj</button>
          <button @click="nextStep(2)" class="btn btn--primary">Krok 2</button>
        </div>
      </div>
    </transition>
    <transition name="slide-right">
      <div v-if="step===2" class="step-two">
        <label for="opinionContent">Opisz co uwazasz o tej swojej szkole</label>
        <textarea
          v-model="rateValues.content"
          class="textarea-content"
          name="opinion-content"
          id="opinionContent"
          placeholder="Opisz co uwazasz o tej swojej szkole."
        ></textarea>
        <div class="buttons">
          <button @click="nextStep(1)" class="btn btn--ghost-red">Krok 1</button>
          <button @click="addRate" class="btn btn--primary">Dodaj!</button>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <div
        v-if="message.content"
        :class="{'message--error':message.error,'message--success':message.success}"
        class="message"
      >
        <span class="message__header-text" v-if="message.error">Ups...</span>
        <span class="message__header-text" v-if="message.success">Mamy to!</span>
        <p>{{message.content}}</p>
      </div>
    </transition>
  </div>
</template>

<script>
require("dotenv").config();
import { setTimeout } from "timers";
import axios from "axios";
export default {
  data() {
    return {
      step: 1,
      message: {
        content: "",
        error: false,
        success: false
      },
      userPrint: null,
      rateValues: {
        content: "",
        teachers: 3,
        flow: 3,
        commute: 3,
        standard: 3
      }
    };
  },
  props: {
    school: {
      type: Object,
      require: true,
      default: {}
    }
  },
  methods: {
    closeModal() {
      this.$emit("closeModal", true);
    },
    nextStep(step) {
      this.step = step;
    },
    addRate() {
      axios
        .get(`${process.env.API_URL}/rates/userprint/${this.userPrint}`)
        .then(data => {
          if (data.data.length === 0) {
            axios
              .post(`${process.env.API_URL}/rates/${this.school._id}`, {
                user_fingerprint: this.userPrint,
                content: this.rateValues.content,
                flow: this.rateValues.flow,
                teachers: this.rateValues.teachers,
                commute: this.rateValues.commute,
                standard: this.rateValues.standard
              })
              .then(() => {
                this.$emit("updateRatesList");
                this.message = {
                  content: "Dodano twoją opinię!",
                  success: true
                };
                setTimeout(() => {
                  this.closeModal();
                }, 2500);
              });
          } else {
            this.message = {
              content:
                "W trosce o wiarygodnośc mozesz wystawic tylko 1 opinię 1 szkole",
              error: true
            };

            setTimeout(() => {
              this.closeModal();
            }, 3000);
          }
        });
    }
  },
  computed: {
    teachers() {
      return this.rateValues.teachers;
    }
  },
  mounted() {
    let client = new ClientJS();
    setTimeout(() => {
      this.userPrint = client.getFingerprint();
    }, 500);
  }
};
</script>

<style lang="scss" scoped>
.modalWrapper {
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 75vh;
  z-index: 9999;
  padding: 20px;
  background: #fff;
  box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.3);
  .buttons {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .modal-header {
    margin: 15px 0;
    h2 {
      margin: 0;
    }
  }
  .step-one {
    .inputs {
      display: flex;
      flex-direction: column;
      z-index: 99999;
      .inputs__input {
        display: flex;
        flex-direction: column;
        padding: 5px 0;
        .input__slider {
          display: flex;
          width: 100%;
          justify-content: space-around;
          .slider__input {
            flex: 3;
          }
          span {
            flex: 1;
            text-align: center;
            color: #16dea3;
            margin: auto;
            font-size: 1.4rem;
          }
        }
      }
    }
  }
  .step-two {
    .textarea-content {
      width: 100%;
      height: 40%;
      padding: 10px;
      border: #16dea3 1px solid;
      border-radius: 5px;
      font-family: "Nunito", sans-serif;
      font-size: 1rem;
      transition: background 0.2s ease-out;
      &:focus {
        outline: none;
        background: #16dea3;
      }
    }
  }
  .message {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40%;
    text-align: center;
    padding: 20px;
    color: #fff;
    .message__header-text {
      font-size: 2rem;
    }
  }
  .message--error {
    background: #f14848;
  }
  .message--success {
    background: #16dea3;
  }
}
@media (min-width: 720px) {
  .modalWrapper {
    padding: 50px 90px;
  }
}
</style>