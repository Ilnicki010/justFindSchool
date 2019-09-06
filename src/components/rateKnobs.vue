<template>
  <div class="knobs">
    <div class="knobs__knob">
      <knob-control
        id="flow"
        v-model="rateValues.flow"
        :min="1"
        :max="6"
        :stroke-width="2"
        :primary-color="'#16dea3'"
        :responsive="true"
      ></knob-control>
      <label for="flow">Klimat</label>
    </div>
    <div class="knobs__knob">
      <knob-control
        id="standard"
        v-model="rateValues.standard"
        :min="1"
        :max="6"
        :stroke-width="2"
        :primary-color="'#16dea3'"
        :responsive="true"
      ></knob-control>
      <label for="standard">Standard</label>
    </div>
    <div class="knobs__knob">
      <knob-control
        id="teachers"
        v-model="rateValues.teachers"
        :min="1"
        :max="6"
        :stroke-width="2"
        :primary-color="'#16dea3'"
        :responsive="true"
      ></knob-control>
      <label for="commute">Nauczyciele</label>
    </div>
    <div v-if="!shorter" class="knobs__knob">
      <knob-control
        id="commute"
        v-model="rateValues.commute"
        :min="1"
        :max="6"
        :stroke-width="2"
        :primary-color="'#16dea3'"
        :responsive="true"
      ></knob-control>
      <label for="commute">Dojazd</label>
    </div>
  </div>
</template>

<script>
import knobControl from "vue-knob-control";
export default {
  components: {
    knobControl
  },
  props: {
    rateValues: {
      required: true,
      type: Object
    },
    shorter: {
      required: false,
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.knobs {
  display: flex;
  position: relative;
  z-index: 1;
  max-height: 100px;
  .knobs__knob {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
  }
}
@media (min-width: 720px) {
}
</style>