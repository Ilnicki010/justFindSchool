<template>
  <div v-if="allSchools" class="schoollistWrapper">
    <div class="sort-wrapper">
      <div>
        <label for="sort-select" class="sort-label">Sortuj</label>
        <select id="sort-select" v-model="sort" class="sort-select">
          <option value="flow">Od najlepszego klimatu</option>
          <option value="teachers">Od najlepszych nauczycieli</option>
          <option value="standard">Od najlepszego standardu nauczania</option>
          <option value="commute">Od najlepszego dojazdu</option>
        </select>
      </div>
      <div>
        <label for="school-search" class="search-section__label">Wyszukaj</label>
        <input
          id="school-search"
          v-model="searchInput"
          class="sort-select"
          type="text"
          name="school-search"
          placeholder="np. IX LO"
        />
      </div>
    </div>
    <section class="school-list">
      <school-list-item v-for="school in orderedSchools" :key="school._id" :school="school" />
    </section>
  </div>
</template>

<script>
import _ from "lodash";
import SchoolListItem from "@/components/SchoolListItem";

export default {
  components: {
    SchoolListItem
  },
  props: {
    schoolList: {
      require: true,
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      allSchools: [],
      sort: "teachers",
      searchInput: "",
      loading: true
    };
  },
  computed: {
    orderedSchools() {
      if (this.searchInput.length >= 2) {
        return this.allSchools.filter(item =>
          this.searchInput
            .toLowerCase()
            .split(" ")
            .every(v => item.name.toLowerCase().includes(v))
        );
      }
      return (this.allSchools = _.orderBy(
        this.allSchools,
        [school => _.get(school, `ratesAvg.${this.sort}`, "")],
        ["desc"]
      ));
    }
  },
  watch: {
    schoolList() {
      this.allSchools = this.schoolList;
      this.loading = false;
    }
  }
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
      background: $primary;
      color: $white;
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
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
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
