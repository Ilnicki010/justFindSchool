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
              <span id="teachersValue">{{rateValues.teachers}} / 6</span>
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
              <span>{{rateValues.flow}} / 6</span>
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
              <span>{{rateValues.standard}} / 6</span>
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
              <span>{{rateValues.commute}} / 6</span>
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
        <div>
          <label for="opinionContent">Opisz co uwazasz o tej swojej szkole</label>
          <textarea
            v-model="rateValues.content"
            class="textarea-content"
            name="opinion-content"
            id="opinionContent"
            placeholder="Opisz co uwazasz o tej swojej szkole."
          ></textarea>
        </div>
        <div class="class-select">
          <label for="class-select" class="class-select__label">W jakiej jesteś klasie?</label>
          <select v-model="rateValues.class" id="class-select" class="class-select__input">
            <option value selected disabled hidden>Wybierz</option>
            <option value="I">I LO</option>
            <option value="II">II LO</option>
            <option value="III">III LO</option>
            <option value="Absolwent">Absolwent</option>
          </select>
        </div>
        <div class="buttons-captacha-wrapper">
          <vue-recaptcha
            :load-recaptcha-script="true"
            @verify="markRecaptchaAsVerified"
            :sitekey="recaptcha_key"
            class="recaptcha"
          ></vue-recaptcha>
          <div class="buttons">
            <button @click="nextStep(1)" class="btn btn--ghost-red">Krok 1</button>
            <button @click="addRate" class="btn btn--primary">Dodaj!</button>
          </div>
          <div v-if="errors.length > 0" class="error-message">
            <ul v-for="error in errors" :key="error.indexOf(error)">
              <li>{{error}}</li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <message-component
      v-if="message.value"
      :messageType="message.type"
      :messageValue="message.value"
    />
  </div>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
import messageComponent from "@/components/messageComponent";
import { setTimeout } from "timers";
import axios from "axios";
require("clientjs");
const authorizationBasic = window.btoa(
  "admin" + ":" + process.env.VUE_APP_API_KEY
);
const config = {
  headers: { Authorization: "Basic " + authorizationBasic }
};
export default {
  components: {
    VueRecaptcha,
    messageComponent
  },
  data() {
    return {
      step: 1,
      message: {
        value: "",
        type: {
          error: false,
          success: false
        }
      },
      userPrint: null,
      rateValues: {
        content: "",
        class: "",
        teachers: 3,
        flow: 3,
        commute: 3,
        standard: 3
      },
      errors: [],
      recaptcha: {
        recaptchaVerified: false
      },
      recaptcha_key: process.env.VUE_APP_RECAPTCHA
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
    checkForm() {
      if (
        this.rateValues.content.length >= 5 &&
        this.rateValues.class &&
        this.recaptcha.recaptchaVerified
      ) {
        return true;
      } else {
        this.errors = [];
        if (this.rateValues.content.length < 5) {
          this.errors.push("Treść musi mieć min. 5 znaków");
        }
        if (!this.rateValues.class) {
          this.errors.push("Musisz podać klasę do której chodzisz");
        }
        if (!this.recaptcha.recaptchaVerified) {
          this.errors.push("Zaznacz najpierw recaptcha");
        }
        return false;
      }
    },
    closeModal() {
      this.$emit("closeModal", true);
    },
    nextStep(step) {
      this.step = step;
    },
    markRecaptchaAsVerified(response) {
      this.errorMessage = "";
      this.recaptcha.recaptchaVerified = true;
      console.log(response);
    },
    addRate() {
      if (this.checkForm()) {
        axios
          .get(
            `${process.env.VUE_APP_API_URL}/rates/userprint/${this.userPrint}`,
            config
          )
          .then(data => {
            if (data.data.length === 0) {
              axios
                .post(
                  `${process.env.VUE_APP_API_URL}/rates/${this.school._id}`,
                  {
                    user_fingerprint: this.userPrint,
                    user_class: this.rateValues.class,
                    content: this.rateValues.content,
                    flow: this.rateValues.flow,
                    teachers: this.rateValues.teachers,
                    commute: this.rateValues.commute,
                    standard: this.rateValues.standard
                  },
                  config
                )
                .then(() => {
                  this.$emit("updateRatesList");
                  this.$emit("addedOpinion");
                  this.message.value = "Dodano twoją opinię!";
                  this.message.type.success = true;

                  setTimeout(() => {
                    this.closeModal();
                  }, 2500);
                });
            } else {
              this.message.value =
                "W trosce o wiarygodnośc mozesz wystawic tylko 1 opinię 1 szkole";
              this.message.type.error = true;

              setTimeout(() => {
                this.closeModal();
              }, 3000);
            }
          });
      }
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
  height: 80vh;
  z-index: 9999;
  padding: 20px;
  background: #fff;
  box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.3);
  .buttons {
    display: flex;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    margin: 0 10px;
  }
  .buttons-captacha-wrapper {
    display: flex;
    flex-direction: column;
    display: flex;
    justify-content: center;
    padding: 20px 0;
    .recaptcha {
      margin: auto;
    }
    .error-message {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      margin: auto;
      color: #fff;
      padding: 5px 10px;
      background: #f14848;
      border: none;
    }
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
    .class-select {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .class-select__input {
        padding: 7px 7px 7px 10px;
        border: #16dea3 1px solid;
        background: #fff;
        border-radius: 5px;
      }
    }
    .textarea-content {
      width: 100%;
      height: 150px;
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
}
@media (min-width: 720px) {
  .modalWrapper {
    padding: 50px 90px;
    .buttons-captacha-wrapper {
      .recaptcha {
        margin: initial;
        margin-left: auto;
      }
    }
  }
}
</style>