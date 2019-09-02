<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.name == 'home'"></router-view>
    </keep-alive>
    <router-view v-if="$route.name != 'home'"></router-view>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.$route.name);
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
select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  -webkit-appearance: none;
}
input[type="range"] {
  -webkit-appearance: none;
  background: transparent;
  height: 25px;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background: #16dea3;
  height: 25px;
  width: 25px;
  border-radius: 99px;
  border: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  height: 25px;
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
//transitons
.slide-enter-active,
.slide-right-enter-active .slide-left-enter-active {
  transition: transform 0.2s ease-out, opacity 0.2s ease-out;
}
.slide-leave-active,
.slide-right-leave-active,
.slide-left-leave-active {
  transition: transform 0.2s ease-in, opacity 0.2s ease-in;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(70vh);
}
.slide-enter-to,
.slide-leave {
  transform: translateY(0);
}
//gfgsfgdsgd
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
</style>
