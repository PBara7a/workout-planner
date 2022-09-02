const dbClient = require("./prisma");
const demoUrls = require("./demoUrls.json");

const createEmailContent = async (workoutId, recipient) => {
  const workout = await dbClient.workout.findUnique({
    where: {
      id: workoutId,
    },
    include: {
      exercises: true,
    },
  });

  const exercisesHTML = workout.exercises
    .map(
      (exercise, i) =>
        `<div><h2>${i + 1}: ${exercise.name}</h2><img src=${
          demoUrls[exercise.demo]
        } alt="exercise demo" /></div>`
    )
    .join("<br />");

  const msg = {
    to: recipient,
    from: process.env.EMAIL,
    subject: "WOD",
    html: `<body><h1>Today's workout: ${workout.name}</h1><h2>Target: ${workout.target}</h2><h3>Exercises:</h3>${exercisesHTML}<h3>Intructions: ${workout.notes}</h3></body>`,
  };

  return msg;
};

module.exports = createEmailContent;
