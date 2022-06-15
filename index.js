const exercises = require("./exercises.json");

const filtered = exercises.filter(
  (el) => el.target === "cardiovascular system"
);
console.log(filtered);
