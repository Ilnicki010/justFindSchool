<template>
  <keep-alive>
    <div class="homeWrapper">
      <header class="main-header">
        <div class="main-header__content">
          <h1>Znajdź szkołę o jakiej marzysz</h1>
          <section class="search-section">
            <div>
              <label for="city-select" class="search-section__label">MIASTO</label>
              <select
                @change="getSchoolList"
                v-model="city"
                id="city-select"
                class="search-section__input"
              >
                <option value="Gdynia">Gdynia</option>
                <option value="Sopot">Sopot</option>
                <option value="Gdańsk">Gdańsk</option>
              </select>
            </div>
          </section>
        </div>
      </header>
      <main>
        <section class="search-results">
          <h2 :city="city" class="city-name">{{city}}</h2>
          <discover-section />
          <div class="all-schools" v-if="allSchools" :key="keyToRender">
            <h3>Wszystkie szkoły ({{allSchools.length}})</h3>
            <school-list v-if="allSchools" :schoolList="allSchools" />
          </div>
        </section>
      </main>
    </div>
  </keep-alive>
</template>
<script>
import axios from "axios";
import schoolList from "@/components/schoolList";
import discoverSection from "@/components/discoverSection";
export default {
  components: {
    schoolList,
    discoverSection
  },
  data() {
    return {
      city: "Gdynia",
      allSchools: [],
      discoverReady: false,
      keyToRender: 0,
      logoType: "logo_small.svg"
    };
  },
  props: {
    cityName: {
      type: String,
      default: "Gdynia",
      required: false
    }
  },
  mounted() {
    if (window.screen.width < 720) {
      this.logoType = "@/assets/logo_small.svg";
    } else {
      this.logoType = "logo_big.svg";
    }
    console.log(this.logoType);
    this.city = this.cityName;
    this.getSchoolList();
  },
  methods: {
    getSchoolList() {
      this.keyToRender += 1;
      axios
        .get(`https://school-248910.appspot.com/schools?city=${this.city}`)
        .then(data => {
          this.allSchools = data.data;
          console.log(this.allSchools);
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
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 50vh;
    color: #fff;
    background: #000;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: linear-gradient(to top, rgba(#000, 0.6), rgba(#000, 0.9)),
      url("../assets/header.jpg");
    .main-header__content {
      margin: auto;
      padding: 0 10px;
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
          border: 1px solid #16dea3;
          background: #16dea3;
          color: #fff;
          border-radius: 4.3px;
          padding: 15px 20px;
          width: 100%;
          margin: 5px 0 15px 0;
          font-size: 1.2rem;
          font-weight: 100;
          transition: opacity 0.1s ease-out;

          &::placeholder {
            color: #fff;
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
  main {
    position: relative;
    width: 100vw;
    padding: 20px;

    .search-results {
      display: flex;
      flex-direction: column;
      .city-name {
        font-size: 3rem;
        margin: 50px auto 20px;
        position: relative;
        width: 100%;
        text-align: center;
        &::after {
          content: attr(city);
          position: absolute;
          font-family: "Sacramento", cursive;
          top: -60px;
          left: 0;
          right: 0;
          margin-left: auto;
          margin-right: auto;
          color: #16dea3;
          z-index: -99;
          font-size: 6rem;
          opacity: 0.5;
          width: 100%;
        }
      }
      .all-schools {
        margin-top: 5vh;
      }
    }
  }
}
@media (min-width: 720px) {
  .homeWrapper {
    .main-header {
      height: 80vh;
      padding: 100px;
      .main-header__content {
        background: #fff;
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
    main {
      padding: 70px;
    }
  }
}
</style>
