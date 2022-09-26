import React, { useCallback } from "react";
import "./App.css";
import { getNiceDate } from "./utils";
import PortionBar from "../components/PortionBar";
import usePersistedState from "../hooks/usePersistedState";

const LE_DIET_APP_STATE_V1 = "LE_DIET_APP_STATE_V1";

const FOOD_CONFIG = [
  {
    name: "Protein",
    perDayMin: 6,
    perDayMax: 6,
  },
  {
    name: "Vegetables",
    perDayMin: 4,
    perDayMax: 6,
  },
  {
    name: "Carbs",
    perDayMin: 5,
    perDayMax: 5,
  },
  {
    name: "Fats",
    perDayMin: 6,
    perDayMax: 6,
  },
];

function App() {
  const [values, setValues, date] = usePersistedState(
    LE_DIET_APP_STATE_V1,
    () => FOOD_CONFIG.map(() => 0),
    "D"
  );

  const incrementValue = useCallback(
    (index) => {
      setValues((oldValues) => {
        const newValues = oldValues.slice();
        newValues[index] = Math.min(
          newValues[index] + 1,
          FOOD_CONFIG[index].perDayMax * 2
        );

        return newValues;
      });
    },
    [setValues]
  );
  const decrementValue = useCallback(
    (index) => {
      setValues((oldValues) => {
        const newValues = oldValues.slice();
        newValues[index] = Math.max(newValues[index] - 1, 0);
        return newValues;
      });
    },
    [setValues]
  );
  const onResetSelection = useCallback(() => {
    setValues(FOOD_CONFIG.map(() => 0));
  }, [setValues]);
  const isResetDisabled = values.every((value) => value === 0);

  return (
    <div className="Container">
      <div className="Header">
        <label>Daily Portion Tracker</label>
      </div>
      <div className="SubHeader">
        <label>{`For: ${getNiceDate(date)}`}</label>
      </div>
      <div className="FoodContainer">
        {FOOD_CONFIG.map(({ name, perDayMin, perDayMax }, index) => {
          const isDecrementDisabled = values[index] === 0;
          const isIncrementDisabled = values[index] === perDayMax * 2;

          return (
            <div className={`FoodRow FoodRow-${name}`} key={index}>
              <div class={`CategoryImage CategoryImage-${name}`} />
              <div className="ControlsContainer">
                <div className="ControlsRow">
                  <div
                    className={`FoodIntakeButton ${
                      isDecrementDisabled ? "FoodIntakeButton-Disabled" : ""
                    }`}
                    onClick={() => decrementValue(index)}
                  >
                    -
                  </div>
                  <div
                    className={`FoodIntakeButton ${
                      isIncrementDisabled ? "FoodIntakeButton-Disabled" : ""
                    }`}
                    onClick={() => incrementValue(index)}
                  >
                    +
                  </div>
                </div>

                <PortionBar
                  value={values[index]}
                  name={name}
                  perDayMin={perDayMin}
                  perDayMax={perDayMax}
                />
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="ResetButton"
        onClick={onResetSelection}
        disabled={isResetDisabled}
      >
        Reset Selection
      </button>
    </div>
  );
}

export default React.memo(App);
