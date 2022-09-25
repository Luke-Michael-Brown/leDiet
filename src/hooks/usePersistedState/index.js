import { useCallback, useState, useEffect, useRef, useMemo } from "react";
import { tickState } from "./utils";

// How often should we poll to get the current date object
const POLLING_TIME = 1000;

/**
 * Hook that functions the same 'useState', but stores the data in localStorage
 *
 * @param localStorage key to use
 * @param _defaultValue normal defaultValue you would pass to 'useState'
 * @param savePeriod How long to keep in storage until clearing
 *  F - Forever
 *  M - Within the month
 *  W - Within the week
 *  D - Within the day
 * @returns Same format as 'useState', but also the current date (polled to a 's')
 */
export default function usePersistedState(key, _defaultValue, savePeriod) {
  const defaultValue = useMemo(
    () =>
      typeof _defaultValue === "function" ? _defaultValue() : _defaultValue,
    [_defaultValue]
  );

  const [{ state, date }, _setState] = useState(() => {
    let storedDate, storedState;
    try {
      const storedData = JSON.parse(localStorage.getItem(key));
      storedDate = new Date(storedData.date);
      storedState = storedData.state;
    } catch (ex) {}

    return tickState({
      oldState: storedState,
      oldDate: storedDate,
      savePeriod,
      defaultValue,
    });
  });

  const setState = useCallback((newState) => {
    return _setState(({ state: oldState, date: oldDate }) => ({
      date: oldDate,
      state: typeof newState === "function" ? newState(oldState) : newState,
    }));
  }, []);

  const interval = useRef();
  useEffect(() => {
    interval.current = setInterval(() => {
      _setState(({ state: oldState, date: oldDate }) =>
        tickState({ oldState, oldDate, savePeriod, defaultValue })
      );
    }, POLLING_TIME);

    return () => {
      clearInterval(interval.current);
      interval.current = undefined;
    };
  }, [defaultValue, savePeriod]);

  useEffect(() => {
    localStorage.setItem(
      key,
      JSON.stringify({
        state,
        date,
      })
    );
  }, [state]);

  return [state, setState, date];
}
