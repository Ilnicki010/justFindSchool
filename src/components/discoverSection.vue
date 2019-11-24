<template>
  <div v-if="ready" class="featured-articles">
    <h3>Odkrywaj</h3>
    <div class="articles-list">
      <article class="featured">
        <h4>
          #3 szkoły z najlepszym
          <span class="text-green">klimatem</span>
        </h4>
        <a class="btn btn--primary" href="/">Sprawdź</a>
      </article>
      <article class="featured">
        <h4>
          #5 szkół z najlepszym
          <span class="text-green">poziomem nauki</span>
        </h4>
        <a class="btn btn--primary" href="/">Sprawdź</a>
      </article>
      <article class="featured">
        <h4>
          #10 szkoł z najlepszym
          <span class="text-green">jedzeniem</span>
        </h4>
        <a class="btn btn--primary" href="/">Sprawdź</a>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ready: false
    };
  }
};
</script>

<style lang="scss" scoped>
.featured-articles {
  .soon {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    p {
      color: #16dea3;
    }
  }
  .articles-list {
    width: 100%;
    overflow-x: scroll;
    display: flex;
    flex-direction: row;
    .featured {
      flex: 1;
      height: 200px;
      min-width: 200px;
      margin: 10px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(#000, 0.2);
    }
  }
}
@media (min-wdth: 720px) {
  .articles-list {
    .featured {
      .btn {
        margin-left: auto;
      }
    }
  }
}
</style>
