<template>
  <div class="container">
    <div class="bar">
      <div>calc</div>
      <div>theme</div>
    </div>
    <div class="display">1234456</div>
    <div class="buttons">
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="text">DEL</button>

      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>

      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>-</button>

      <button>.</button>
      <button>0</button>
      <button>/</button>
      <button>x️</button>

      <button class="span-two text">RESET</button>
      <button class="span-two red">=</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Calculator",
  components: {},
});
</script>

<style>
body {
  background-color: hsl(225, 21%, 49%);
}
.container {
  color: hsl(0, 0%, 100%);
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 70%;
  margin: 0 auto;
}

.bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
}

.display {
  grid-column: 1 / -1;
  min-height: 90px;
  background-color: hsl(224, 36%, 15%);
  border-radius: 10px;
  color: hsl(0, 0%, 100%);
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  flex-direction: column;
  padding-right: 20px;
  margin-top: 10px;
  word-wrap: break-word;
  word-break: break-all;
}

.buttons {
  display: grid;
  justify-content: center;
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
  grid-template-columns: repeat(4, 85px);
  grid-template-rows: repeat(5, 80px);
  background-color: hsl(223, 31%, 20%);
}

.buttons > button {
  border: none;
  font-family: "Spartan", Menlo, Avenir, Helvetica, Arial, sans-serif;
  cursor: pointer;
  font-size: 2rem;
  outline: none;
  border-radius: 5px;
  background-color: hsl(30, 25%, 89%);
  color: hsl(224, 28%, 35%);
  padding: 15px;
  margin: 8px;
  box-shadow: 0 4px 0 0 hsl(28, 16%, 65%);
}

.buttons > button:active {
  transform: translateY(4px);
  box-shadow: 0 0 0 0;
}

.span-two {
  grid-column: 2 span;
}

.span-two.text {
  background-color: hsl(225, 21%, 49%);
  box-shadow: 0 4px 0 0 hsl(224, 28%, 35%);
  color: hsl(0, 0%, 100%);
}

.text {
  box-shadow: 0 4px 0 0 hsl(224, 28%, 35%) !important;
  background-color: hsl(225, 21%, 49%) !important;
  font-size: 1rem !important;
  color: hsl(0, 0%, 100%) !important;
}

button.text:active {
  transform: translateY(4px) !important;
  box-shadow: 0 0 0 0 !important;
}

.span-two.red {
  font-size: 1rem;
  color: hsl(0, 0%, 100%);
  box-shadow: 0 4px 0 0 hsl(6, 70%, 34%);
  background-color: hsl(6, 63%, 50%);
}
</style>
