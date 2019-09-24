<template>
  <div class="faqWrapper">
    <h1>Najczęściej zadawane pytania</h1>
    <div>
      <ul>
        <li>
          <h2>Czy moja opinia będzie anonimowa?</h2>
          <p>Tak. Twoja opinia będzie w pełni anonimowa, nigdzie nie podasz imienia ani nazwiska. Aplikacja nie ma także dostępu do lokalizacji Twojego urządzenia, ani nie wymaga logowania.</p>
        </li>
        <li>
          <h2>Dlaczego mogę dodać tylko jedną opinie o jednej szkole?</h2>
          <p>Zaplanowaliśmy to tak w trosce o jakość i wiarygodność wystawianych opinii.</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.faqWrapper {
  margin-top: 5vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  ul {
    list-style-type: none;
    padding: 0;
  }
  h2 {
    color: #16dea3;
  }
  p {
    border-left: 1px solid #16dea3;
    padding: 0 15px;
  }
}
@media (min-width: 720px) {
  .faqWrapper {
    padding: 0 70px;
  }
}
</style>