<template>
  <Calculator />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Calculator from "./components/Calculator.vue";

export default defineComponent({
  name: "App",
  components: { Calculator },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Spartan:wght@700&display=swap");
body {
  font-family: "Spartan", Menlo, Avenir, Helvetica, Arial, sans-serif;
}
</style>
