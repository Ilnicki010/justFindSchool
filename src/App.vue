<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.$route.meta.keepAlive);
  }
};
</script>
<style lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
}
html {
  margin: 0;
  padding: 0;
}
body {
  margin: 0;
  padding: 0;
  font-family: "Nunito", sans-serif;
}
h1 {
  font-size: 2rem;
}
h2 {
  font-size: 1.7rem;
}
h3 {
  font-size: 1.4rem;
}
a {
  color: #000;
  text-decoration: none;
}
label {
  font-weight: 600;
  padding: 3px 0;
  font-size: 0.9rem;
}
input,
textarea {
  font-size: 16px;
}
select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  -webkit-appearance: none;
  font-size: 16px;
}
input[type="range"] {
  -webkit-appearance: none;
  background: transparent;
  height: 35px;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background: #16dea3;
  height: 35px;
  width: 35px;
  border-radius: 99px;
  border: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  height: 35px;
  background: linear-gradient(to right, #f1f1f1, #dbdbdb);
  border-radius: 100px;
}
input::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #fff;
}
input::-moz-placeholder {
  /* Firefox 19+ */
  color: #fff;
}
input:-moz-placeholder {
  /* Firefox 18- */
  color: #fff;
}
html {
  -webkit-tap-highlight-color: rgba(#16dea3, 0.3);
}

.btn {
  text-align: center;
  font-weight: 600;
  border-radius: 3px;
  padding: 10px;
  width: 120px;
  min-height: 48px;
  border: 0;
  font-size: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.btn--primary {
  color: #fff;
  background: #16dea3;
  border: 1px solid #16dea3;
}
.btn--ghost-red {
  background: none;
  color: #f14848;
  border: 1px solid #f14848;
}
.btn--ghost-green {
  background: none;
  color: #16dea3;
  border: 1px solid #16dea3;
}
.btn--rounded {
  border-radius: 100px;
}
.text-green {
  color: #16dea3;
}
@keyframes scale {
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
}
@keyframes slideIn {
  from {
    transform: translateY(100vw);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes shake {
  0%,
  7%,
  20%,
  50%,
  100% {
    transform: scale(1);
  }
  3% {
    transform: scale(1.06);
  }
}
//transitons
.slide-enter-active,
.slide-right-enter-active .slide-left-enter-active {
  transition: transform 0.6s ease-out, opacity 0.6s ease-out;
}
.slide-fast-enter-active,
.slide-fast-leave-active {
  transition: transform 0.2s ease-out, opacity 0.2s ease-out;
}
.slide-leave-active,
.slide-right-leave-active,
.slide-left-leave-active {
  transition: transform 0.2s ease-in, opacity 0.2s ease-in;
}
.slide-enter,
.slide-fast-enter,
.slide-fast-leave-to,
.slide-leave-to {
  transform: translateY(100vh);
}
.slide-enter-to,
.slide-fast-enter-to,
.slide-fast-leave,
.slide-leave {
  transform: translateY(0);
}
.slide-left-leave-active,
.slide-left-enter-active {
  transition: all 0.3s;
}
.slide-left-leave,
.slide-left-enter-to,
.slide-right-enter-to {
  transform: translate(0, 0);
}
.slide-left-leave-to,
.slide-left-enter {
  transform: translateX(-100vw);
}
.slide-right-enter-active {
  transition: all 0.3s 0.3s;
}
.slide-right-leave-active {
  transition: all 0.3s;
}
.slide-right-enter {
  transform: translateX(100vw);
}
.slide-right-leave {
  transform: translateY(700px);
}
.slide-right-leave-to {
  transform: translateY(100vw);
}
.popup-enter-active,
.popup-leave-active {
  transition: transform 0.2s ease-out;
}
.popup-enter {
  transform: scale(0.9);
}
.popup-enter-to {
  transform: scale(1);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s 0.5s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-to {
  opacity: 1;
}
.special-header-enter-active {
  transition: all 0.2s ease-out;
}
.special-header-enter {
  opacity: 0;
  transform: translateY(-30px);
}
.special-header-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.slide-up-leave-active,
.slide-up-enter-active {
  transition: 0.4s 0.2s ease-out;
}
.slide-up-enter,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20vh);
}
.slide-up-enter-to,
.slide-up-leave {
  opacity: 1;
  transform: translateY(0);
}
</style>
