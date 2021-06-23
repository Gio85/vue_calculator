<template>
  <div class="container">
    <div class="bar">
      <div>calc</div>
      <div>theme</div>
    </div>
    <div class="display">
      {{ previousValue }} {{ operation }} {{ currentValue }}
    </div>
    <div class="buttons">
      <button @click="appendValue('7')">7</button>
      <button @click="appendValue('8')">8</button>
      <button @click="appendValue('9')">9</button>
      <button @click="deleteLastValue()" class="text">DEL</button>

      <button @click="appendValue('4')">4</button>
      <button @click="appendValue('5')">5</button>
      <button @click="appendValue('6')">6</button>
      <button @click="setOperation('+')">+</button>

      <button @click="appendValue('1')">1</button>
      <button @click="appendValue('2')">2</button>
      <button @click="appendValue('3')">3</button>
      <button @click="setOperation('-')">-</button>

      <button @click="appendValue('.')">.</button>
      <button @click="appendValue('0')">0</button>
      <button @click="setOperation('/')">/</button>
      <button @click="setOperation('x')">x️</button>

      <button @click="resetState()" class="span-two text">RESET</button>
      <button @click="compute(true)" class="span-two red">=</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { IState, TOperation } from "@/types";
import { formatNumber } from "@/utils";

const defaultState: IState = {
  currentValue: "",
  previousValue: "",
  result: "",
  isEqual: false,
  operation: "" as unknown as TOperation,
};

export default defineComponent({
  name: "Calculator",
  components: {},
  setup() {
    const state = reactive<IState>({
      ...defaultState,
    });

    const resetState = () => {
      state.currentValue = defaultState.currentValue;
      state.operation = defaultState.operation;
      state.previousValue = defaultState.previousValue;
      state.result = defaultState.result;
      state.isEqual = defaultState.isEqual;
      return;
    };

    const appendValue = (value: string) => {
      if (
        state.previousValue === "" &&
        state.currentValue !== "" &&
        state.isEqual
      ) {
        state.currentValue = defaultState.currentValue;
        state.isEqual = defaultState.isEqual;
      }
      if (value === "." && state.currentValue.includes(value)) return;
      state.currentValue = formatNumber(state.currentValue.concat(value));
    };

    const deleteLastValue = () => {
      if (state.isEqual) return;
      const slicedNumber = parseFloat(
        state.currentValue.toString().split(",").join("").slice(0, -1)
      );
      if (isNaN(slicedNumber)) {
        state.currentValue = defaultState.currentValue;
        return;
      }
      state.currentValue = slicedNumber.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    };

    const compute = (isEqual = false) => {
      let result = "";
      const previousNumber = parseFloat(
        state.previousValue.split(",").join("")
      );
      const currentNumber = parseFloat(state.currentValue.split(",").join(""));
      if (isNaN(previousNumber) || isNaN(currentNumber)) return;

      if (state.operation === "+") result = `${previousNumber + currentNumber}`;
      if (state.operation === "-") result = `${previousNumber - currentNumber}`;
      if (state.operation === "x") result = `${previousNumber * currentNumber}`;
      if (state.operation === "/") result = `${previousNumber / currentNumber}`;

      if (isEqual) {
        state.isEqual = true;
      }

      state.currentValue = formatNumber(result);
      state.operation = defaultState.operation;
      state.previousValue = defaultState.previousValue;
    };

    const setOperation = (operation: TOperation) => {
      if (state.currentValue === "") return;
      if (state.currentValue !== "" && state.previousValue !== "") compute();

      state.previousValue = state.currentValue;
      state.operation = operation;
      state.currentValue = defaultState.currentValue;
    };

    return {
      ...toRefs(state),
      appendValue,
      deleteLastValue,
      resetState,
      compute,
      setOperation,
    };
  },
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
  justify-content: space-evenly;
  width: 95%;
  height: 96vh;
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
  padding: 0 20px;
  word-wrap: break-word;
  word-break: break-all;
}

.buttons {
  display: grid;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  grid-template-columns: repeat(4, 75px);
  grid-template-rows: repeat(5, 75px);
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
  padding: 15px 10px;
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

@media (max-width: 375px) {
  .container {
    width: 90%;
  }
}

@media (min-width: 425px) {
  .container {
    width: 80%;
  }
}

@media (min-width: 768px) {
  .container {
    width: 45%;
  }
  .buttons {
    display: grid;
    grid-template-columns: repeat(4, 25%);
  }
}

@media (min-width: 1440px) {
  .container {
    width: 40%;
  }

  /*.buttons {*/
  /*  display: grid;*/
  /*  grid-template-columns: repeat(4, 25%);*/
  /*}*/
}

@media (min-width: 1441px) {
  .container {
    width: 60%;
  }

  /*.buttons {*/
  /*  display: grid;*/
  /*  grid-template-columns: repeat(4, 25%);*/
  /*}*/
}
</style>
