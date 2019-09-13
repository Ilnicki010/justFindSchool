<template>
  <div class="schoollistWrapper" v-if="allSchools">
    <div class="sort-wrapper">
      <div>
        <label for="sort-select" class="sort-label">Sortuj</label>
        <select v-model="sort" id="sort-select" class="sort-select">
          <option value="flow">Od najlepszego klimatu</option>
          <option value="teachers">Od najlepszych nauczycieli</option>
        </select>
      </div>
      <div>
        <label for="school-search" class="search-section__label">Wyszukaj</label>
        <input
          v-model="searchInput"
          class="sort-select"
          type="text"
          name="school-search"
          id="school-search"
          placeholder="np. IX LO"
        />
      </div>
    </div>
    <section class="school-list">
      <article v-for="school in orderedSchools" :key="school._id">
        <school-item v-if="school" :school="school" />
      </article>
    </section>
  </div>
</template>

<script>
import schoolItem from "@/components/schoolItem";
import sortBy from "lodash.sortby";
import axios from "axios";
import _ from "lodash";
export default {
  components: {
    schoolItem
  },
  props: {
    schoolList: {
      require: true,
      default: [],
      type: Array
    }
  },
  data() {
    return {
      allSchools: [],
      sort: "teachers",
      searchInput: ""
    };
  },
  computed: {
    orderedSchools() {
      if (this.searchInput.length >= 2) {
        return this.allSchools.filter(item => {
          return this.searchInput
            .toLowerCase()
            .split(" ")
            .every(v => item.name.toLowerCase().includes(v));
        });
      }
      return _.orderBy(this.allSchools, `ratesAvg.${this.sort}`, "desc");
    }
  },
  watch: {
    schoolList() {
      this.allSchools = this.schoolList;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.schoollistWrapper {
  .sort-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 13px 35px;
    flex-direction: column;
    div {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    label {
      flex: 1;
    }
    .sort-select {
      flex: 3;
      background: #16dea3;
      color: #fff;
      padding: 9px 9px 9px 13px;
      border-radius: 3px;
      outline: none;
      border: 0;
    }
  }
}
@media (min-width: 720px) {
  .schoollistWrapper {
    .school-list {
      margin-top: 5vh;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
    .sort-wrapper {
      padding: 20px;
      flex-direction: row;
      .sort-select {
        margin-left: 20px;
      }
    }
  }
}
</style>