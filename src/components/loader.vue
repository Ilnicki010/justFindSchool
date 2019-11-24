<template>
  <div class="loaderWrapper">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="100%"
      height="388"
      viewBox="0 0 1000 388"
    >
      <defs>
        <clipPath id="clip-knobs">
          <rect width="1178" height="388" />
        </clipPath>
      </defs>
      <g id="knobs" clip-path="url(#clip-knobs)">
        <g id="all">
          <g id="_4" data-name="4">
            <g
              id="Ellipse_1"
              data-name="Ellipse 1"
              transform="translate(204 126)"
              fill="none"
              stroke="#16dea3"
              stroke-width="3"
            >
              <circle cx="68.5" cy="68.5" r="68.5" stroke="none" />
              <circle cx="68.5" cy="68.5" r="67" fill="none" />
            </g>
            <text
              id="_4-2"
              data-name="4"
              transform="translate(256 213)"
              fill="#16dea3"
              font-size="55"
              font-family="Nunito-Light, Nunito"
              font-weight="300"
            >
              <tspan x="0" y="0">4</tspan>
            </text>
          </g>
          <g id="_3" data-name="3">
            <g
              id="Ellipse_2"
              data-name="Ellipse 2"
              transform="translate(415 126)"
              fill="none"
              stroke="#16dea3"
              stroke-width="3"
            >
              <circle cx="68.5" cy="68.5" r="68.5" stroke="none" />
              <circle cx="68.5" cy="68.5" r="67" fill="none" />
            </g>
            <text
              id="_5"
              data-name="5"
              transform="translate(467 213)"
              fill="#16dea3"
              font-size="55"
              font-family="Nunito-Light, Nunito"
              font-weight="300"
            >
              <tspan x="0" y="0">5</tspan>
            </text>
          </g>
          <g id="_2" data-name="2">
            <g
              id="Ellipse_3"
              data-name="Ellipse 3"
              transform="translate(626 126)"
              fill="none"
              stroke="#16dea3"
              stroke-width="3"
            >
              <circle cx="68.5" cy="68.5" r="68.5" stroke="none" />
              <circle cx="68.5" cy="68.5" r="67" fill="none" />
            </g>
            <text
              id="_5-2"
              data-name="5"
              transform="translate(678 213)"
              fill="#16dea3"
              font-size="55"
              font-family="Nunito-Light, Nunito"
              font-weight="300"
            >
              <tspan x="0" y="0">5</tspan>
            </text>
          </g>
          <g id="_1" data-name="1">
            <g
              id="Ellipse_4"
              data-name="Ellipse 4"
              transform="translate(837 126)"
              fill="none"
              stroke="#16dea3"
              stroke-width="3"
            >
              <circle cx="68.5" cy="68.5" r="68.5" stroke="none" />
              <circle cx="68.5" cy="68.5" r="67" fill="none" />
            </g>
            <text
              id="_3-2"
              data-name="3"
              transform="translate(889 213)"
              fill="#16dea3"
              font-size="55"
              font-family="Nunito-Light, Nunito"
              font-weight="300"
            >
              <tspan x="0" y="0">3</tspan>
            </text>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.loaderWrapper {
  margin: auto;
}
#_1,
#_2,
#_3,
#_4 {
  animation: move 0.9s infinite alternate both ease-in-out;
  transform-origin: center;
  transform: scale(0.5);
}
#_4 {
  animation-delay: 0.4s;
}
#_3 {
  animation-delay: 0.8s;
}
#_2 {
  animation-delay: 1.1s;
}
#_1 {
  animation-delay: 1.3s;
}
@keyframes move {
  from {
    transform: translatey(-20px) scale(0.5);
  }
  to {
    transform: translatey(20px) scale(0.44);
  }
}
</style>
