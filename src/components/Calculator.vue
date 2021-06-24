<template>
  <div class="container">
    <div class="bar">
      <div>calc</div>
      <div>
        <input type="radio" id="one" value="theme-one" v-on:click="toggle" />
        <label for="one">1</label>
        <input type="radio" id="two" value="theme-two" v-on:click="toggle" />
        <label for="two">2</label>
        <input
          type="radio"
          id="three"
          value="theme-three"
          v-on:click="toggle"
        />
        <label for="three">3</label>
      </div>
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
  setup(props, context) {
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

    const toggle = (event: MouseEvent) => {
      const { value } = event.target as unknown as HTMLInputElement;
      context.emit("change-class", value);
    };

    return {
      ...toRefs(state),
      appendValue,
      deleteLastValue,
      resetState,
      compute,
      setOperation,
      toggle,
    };
  },
});
</script>

<style>
.container {
  color: var(--container-color);
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
  background-color: var(--display-background-color);
  border-radius: 10px;
  color: var(--display-color);
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
  background-color: var(--buttons-background-color);
}

.buttons > button {
  border: none;
  font-family: "Spartan", Menlo, Avenir, Helvetica, Arial, sans-serif;
  cursor: pointer;
  font-size: 2rem;
  outline: none;
  border-radius: 5px;
  background-color: var(--button-background-color);
  color: var(--button-color);
  padding: 15px 10px;
  margin: 8px;
  box-shadow: 0 4px 0 0 var(--button-box-shadow-color);
}

.buttons > button:active {
  transform: translateY(4px);
  box-shadow: 0 0 0 0;
}

.span-two {
  grid-column: 2 span;
}

.span-two.text {
  background-color: var(--span-two-text-background-color);
  box-shadow: 0 4px 0 0 var(--span-two-text-box-shadow-color);
  color: var(--span-two-text-color);
}

.text {
  box-shadow: 0 4px 0 0 var(--span-two-text-box-shadow-color) !important;
  background-color: var(--span-two-text-background-color) !important;
  font-size: 1rem !important;
  color: var(--span-two-text-color) !important;
}

button.text:active {
  transform: translateY(4px) !important;
  box-shadow: 0 0 0 0 !important;
}

.span-two.red {
  font-size: 1rem;
  color: var(--span-two-red-color);
  box-shadow: 0 4px 0 0 var(--span-two-red-box-shadow-color);
  background-color: var(--span-two-red-background-color);
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
}

@media (min-width: 1441px) {
  .container {
    width: 60%;
  }
}
</style>
