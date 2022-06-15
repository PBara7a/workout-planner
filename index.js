const exercises = require("./exercises.json");

const filtered = exercises.filter(
  (el) => el.equipment === "elliptical machine"
);
console.log(filtered.length);
