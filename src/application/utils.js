const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function ordinal_suffix_of(i) {
  var j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + "ˢᵗ";
  }
  if (j === 2 && k !== 12) {
    return i + "ⁿᵈ";
  }
  if (j === 3 && k !== 13) {
    return i + "ʳᵈ";
  }
  return i + "ᵗʰ";
}

export function getNiceDate(date) {
  return `${WEEKDAYS[date.getDay()]}, ${
    MONTHS[date.getMonth()]
  } ${ordinal_suffix_of(date.getDate())} ${date.getFullYear()}`;
}
