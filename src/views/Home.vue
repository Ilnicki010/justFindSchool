<template>
  <div v-if="loaded" class="homeWrapper">
    <transition name="special-header">
      <header class="main-header">
        <nav class="main-header__nav">
          <div class="img-wrapper">
            <img src="@/assets/logo_small.svg" alt="logo" />
          </div>
          <router-link to="/faq" class="btn btn--ghost-green faq-btn">FAQ</router-link>
        </nav>
        <transition name="fade">
          <div class="main-header__content">
            <h1>
              Zamień się rolami i
              <span>oceń swoją szkołę</span>
            </h1>
            <div class="search-section">
              <label for="city-select" class="search-section__label">MIASTO</label>
              <select
                id="city-select"
                v-model="city"
                class="search-section__input"
                @change="getSchoolList"
              >
                <option value="Gdynia">Gdynia</option>
                <option value="Sopot">Sopot</option>
                <option value="Gdańsk">Gdańsk</option>
              </select>
            </div>
          </div>
        </transition>
      </header>
    </transition>
    <main class="search-results">
      <transition name="slide-up" mode="out-in">
        <span v-if="city" :key="city" class="city-name">{{ city }}</span>
      </transition>
      <transition name="slide">
        <div v-if="allSchools" :key="keyToRender" class="all-schools">
          <h3>Wszystkie szkoły ({{ allSchools.length }})</h3>
          <school-list :school-list="allSchools" />
        </div>
      </transition>
    </main>
    <cookies-info />
  </div>
</template>
<script>
import axios from "axios";
import schoolList from "@/components/schoolList";
import cookiesInfo from "@/components/cookiesInfo";

export default {
  components: {
    schoolList,
    cookiesInfo
  },
  props: {
    cityName: {
      type: String,
      default: "Gdynia",
      required: false
    }
  },
  data() {
    return {
      city: "",
      allSchools: [],
      discoverReady: false,
      keyToRender: 0,
      loaded: false
    };
  },
  mounted() {
    this.loaded = true;
    this.city = this.cityName;
    this.getSchoolList();
  },
  methods: {
    getSchoolList() {
      const authorizationBasic = window.btoa(
        `${"admin" + ":"}${process.env.VUE_APP_API_KEY}`
      );
      const config = {
        headers: { Authorization: `Basic ${authorizationBasic}` }
      };
      this.keyToRender++;
      axios
        .get(`${process.env.VUE_APP_API_URL}/schools?city=${this.city}`, config)
        .then(data => {
          this.allSchools = data.data;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.homeWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .main-header {
    position: relative;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    width: 100%;
    height: 60vh;
    color: $white;
    background: $black;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: linear-gradient(to top, rgba($black, 0.9), rgba($black, 0.8)),
      url("https://ik.imagekit.io/ugqakuw7ym/header_O2iECjTEH.jpg");

    .main-header__nav {
      position: absolute;
      display: flex;
      width: 90%;
      padding: 10px;
      justify-content: space-between;
      align-items: center;
      top: 20px;
      .faq-btn {
        flex: 1;
        max-width: 100px;
      }
      .img-wrapper {
        display: flex;
        justify-content: flex-start;
        flex: 3;
        height: 60px;
        img {
          width: 60px;
        }
      }
    }
    .main-header__content {
      padding: 0 10px;
      margin-bottom: 5%;
      border-radius: 5px;
      width: 85%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      h1 {
        margin: 0;
        margin-bottom: 30px;
      }
      .search-section {
        width: 100%;
        .search-section__input {
          border: 1px solid $primary;
          background: $primary;
          color: $white;
          border-radius: 4.3px;
          padding: 15px 20px;
          width: 100%;
          margin: 5px 0 15px 0;
          font-size: 1.2rem;
          font-weight: 100;
          transition: opacity 0.1s ease-out;

          &::placeholder {
            color: $white;
            opacity: 0.7;
          }
          &:focus {
            outline: none;
            opacity: 1;
          }
        }
      }
    }
  }

  .search-results {
    position: relative;
    width: 100vw;
    padding: 20px;
    display: flex;
    flex-direction: column;
    .city-name {
      font-size: 3rem;
      margin: 50px auto 20px;
      position: relative;
      width: 100%;
      text-align: center;
      z-index: -999;
      &::after {
        content: "";
        position: absolute;
        top: -10px;
        left: 0;
        right: 0;
        margin: auto;
        height: 200px;
        width: 3px;
        background: $black;
        transform: rotatex(180deg);
        transform-origin: top;
      }
      &::before {
        content: "";
        position: absolute;
        top: -10px;
        left: 0;
        right: 0;
        margin: auto;
        background: $black;
        width: 12px;
        height: 12px;
        border-radius: 100px;
      }
    }
    .all-schools {
      margin-top: 5vh;
    }
  }
}
@media (min-width: 720px) {
  .homeWrapper {
    .main-header {
      height: 80vh;
      padding: 100px;
      .main-header__content {
        background: $white;
        width: 50vw;
        margin: auto;
        padding: 40px;
        border-radius: 5px;
        h1,
        label {
          color: #333;
        }
        h1 {
          margin-bottom: 30px;
        }
      }
    }
    .search-results {
      padding: 70px;
    }
  }
}
</style>
