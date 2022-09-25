const getWeek = (date) => {
  const janFirst = new Date(date.getFullYear(), 0, 1);
  // Source: https://stackoverflow.com/a/27125580/3307678
  return Math.ceil(
    ((date.getTime() - janFirst.getTime()) / 86400000 + janFirst.getDay() + 1) /
      7
  );
};

const isSameWeek = (dateA, dateB) => {
  return getWeek(dateA) === getWeek(dateB);
};

const isSameDay = (dateA, dateB) => {
  return dateA.toDateString() === dateB.toDateString();
};

const isSameMonth = (dateA, dateB) => {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth()
  );
};

const hasPeriodExpired = (oldDate, newDate, period) => {
  if (!oldDate) {
    return true;
  }

  switch (period) {
    case "M":
      return !isSameMonth(oldDate, newDate);

    case "W":
      return !isSameWeek(oldDate, newDate);

    case "D":
      return !isSameDay(oldDate, newDate);

    case "F":
    default:
      return false;
  }
};

export const tickState = ({ oldState, oldDate, savePeriod, defaultValue }) => {
  const newDate = new Date();

  return {
    // If data expires while app is open then clear it back to default
    state: hasPeriodExpired(oldDate, newDate, savePeriod)
      ? defaultValue
      : oldState,
    date: newDate,
  };
};
