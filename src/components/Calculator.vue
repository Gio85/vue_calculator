<template>
  <div class="container">
    <div class="bar">
      <div>calc</div>
      <div class="switch">
        <div class="switch__main__label">THEME</div>
        <div class="switch__group"></div>
        <input
          name="switch"
          id="one"
          type="radio"
          value="theme-one"
          v-on:click="toggle"
          checked
        />
        <label for="one" class="switch__label">1</label>
        <input
          name="switch"
          id="two"
          type="radio"
          value="theme-two"
          v-on:click="toggle"
        />
        <label for="two" class="switch__label">2</label>
        <input
          name="switch"
          id="three"
          type="radio"
          value="theme-three"
          v-on:click="toggle"
        />
        <label for="three" class="switch__label">3</label>
        <div class="switch__indicator" />
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
.switch {
  font-size: 0.6rem;
  position: relative;
  width: 5rem;
  height: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.switch:before {
  content: "  ";
  position: absolute;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 3rem;
  background: #000;
  border-radius: 30px;
}

.switch__group {
  position: absolute;
  width: 4.5rem;
  background-color: var(--buttons-background-color);
  height: 1.2rem;
  bottom: 0;
  border-radius: 10px;
}

.switch__main__label {
  position: absolute;
  left: -3.5rem;
  bottom: 0;
  font-size: inherit;
}

.switch__label {
  width: 10px;
  cursor: pointer;
}

.switch__label:hover {
  color: white;
}

.switch__indicator {
  width: 0.8rem;
  height: 0.8rem;
  position: absolute;
  bottom: 3px;
  left: 0;
  border-radius: 50%;
  transition: transform 600ms cubic-bezier(0.02, 0.94, 0.09, 0.97),
    background 300ms cubic-bezier(0.17, 0.67, 0.14, 1.03);
  transform: translate3d(1rem, 0, 0);
}

input#one:checked ~ .switch__indicator {
  background: var(--span-two-red-background-color);
  transform: translate3d(0.5rem, 0, 0);
}
input#two:checked ~ .switch__indicator {
  background: var(--span-two-red-background-color);
  transform: translate3d(2rem, 0, 0);
}
input#three:checked ~ .switch__indicator {
  background: var(--span-two-red-background-color);
  transform: translate3d(3.3rem, 0, 0);
}
input[type="radio"]:not(:checked) {
  display: none;
}
input[type="radio"]:checked {
  display: none;
}

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
