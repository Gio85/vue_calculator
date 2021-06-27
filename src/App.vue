<template>
  <div id="main" :class="className">
    <Calculator @change-class="toggle" :className="className" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import Calculator from "./components/Calculator.vue";

const defaultState = {
  className: "theme-one",
};

export default defineComponent({
  name: "App",
  components: { Calculator },
  setup() {
    const state = reactive({
      className: localStorage.getItem("theme") || defaultState.className,
    });
    const toggle = (className: string) => {
      localStorage.setItem("theme", className);
      state.className = className;
    };

    return {
      ...toRefs(state),
      toggle,
    };
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Spartan:wght@700&display=swap");
.theme-one {
  --body-background-color: hsl(225, 21%, 49%);
  --container-color: hsl(0, 0%, 100%);
  --display-background-color: hsl(224, 36%, 15%);
  --display-color: hsl(0, 0%, 100%);
  --buttons-background-color: hsl(223, 31%, 20%);
  --button-background-color: hsl(30, 25%, 89%);
  --button-color: hsl(224, 28%, 35%);
  --button-box-shadow-color: hsl(28, 16%, 65%);
  --span-two-text-background-color: hsl(225, 21%, 49%);
  --span-two-text-color: hsl(0, 0%, 100%);
  --span-two-text-box-shadow-color: hsl(224, 28%, 35%);
  --span-two-red-background-color: hsl(6, 63%, 50%);
  --span-two-red-color: hsl(0, 0%, 100%);
  --span-two-red-box-shadow-color: hsl(6, 70%, 34%);
}

.theme-two {
  --body-background-color: hsl(0, 0%, 90%);
  --container-color: hsl(221, 14%, 31%);
  --display-background-color: hsl(0, 0%, 93%);
  --display-color: hsl(221, 14%, 31%);
  --buttons-background-color: hsl(0, 5%, 81%);
  --button-background-color: hsl(45, 7%, 89%);
  --button-color: hsl(224, 28%, 35%);
  --button-box-shadow-color: hsl(35, 11%, 61%);
  --span-two-text-background-color: hsl(185, 42%, 37%);
  --span-two-text-color: hsl(0, 0%, 100%);
  --span-two-text-box-shadow-color: hsl(185, 58%, 25%);
  --span-two-red-background-color: hsl(25, 98%, 40%);
  --span-two-red-color: hsl(0, 0%, 100%);
  --span-two-red-box-shadow-color: hsl(25, 99%, 27%);
}

.theme-three {
  --body-background-color: hsl(268, 75%, 9%);
  --container-color: hsl(52, 100%, 62%);
  --display-background-color: hsl(268, 71%, 12%);
  --display-color: hsl(52, 100%, 62%);
  --buttons-background-color: hsl(268, 71%, 12%);
  --button-background-color: hsl(268, 47%, 21%);
  --button-color: hsl(52, 100%, 62%);
  --button-box-shadow-color: hsl(285, 91%, 52%);
  --span-two-text-background-color: hsl(281, 89%, 26%);
  --span-two-text-color: hsl(0, 0%, 100%);
  --span-two-text-box-shadow-color: hsl(290, 70%, 36%);
  --span-two-red-background-color: hsl(176, 100%, 44%);
  --span-two-red-color: hsl(198, 20%, 13%);
  --span-two-red-box-shadow-color: hsl(224, 28%, 35%);
}
body {
  font-family: "Spartan", Menlo, Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}

#main {
  background-color: var(--body-background-color);
  height: 100vh;
}
</style>
