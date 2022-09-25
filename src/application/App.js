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
    perDatMax: 6,
  },
  {
    name: "Vegetables",
    perDayMin: 4,
    perDatMax: 6,
  },
  {
    name: "Carbs",
    perDayMin: 5,
    perDatMax: 5,
  },
  {
    name: "Fats",
    perDayMin: 6,
    perDatMax: 6,
  },
];

function App() {
  const [values, setValues, date] = usePersistedState(
    LE_DIET_APP_STATE_V1,
    () => FOOD_CONFIG.map(() => 0)
  );
  const incrementValue = useCallback(
    (index) => {
      setValues((oldValues) => {
        const newValues = oldValues.slice();
        newValues[index] = Math.min(
          newValues[index] + 1,
          FOOD_CONFIG[index].perDatMax * 2
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

  return (
    <div className="Container">
      <div className="Header">
        <label>Daily Portion Tracker</label>
      </div>
      <div className="SubHeader">
        <label>{`For: ${getNiceDate(date)}`}</label>
      </div>
      <div className="FoodContainer">
        {FOOD_CONFIG.map(({ name, perDayMin, perDatMax }, index) => (
          <div className={`FoodRow FoodRow-${name}`} key={index}>
            <div class={`CategoryImage CategoryImage-${name}`} />
            <div className="ControlsContainer">
              <div className="ControlsRow">
                <div
                  className="FoodIntakeButton"
                  onClick={() => decrementValue(index)}
                >
                  -
                </div>
                <div
                  className="FoodIntakeButton"
                  onClick={() => incrementValue(index)}
                >
                  +
                </div>
              </div>

              <PortionBar
                value={values[index]}
                name={name}
                perDayMin={perDayMin}
                perDayMax={perDatMax}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(App);
