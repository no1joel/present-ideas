const createSnowflake = (noDelay) => {
  const flake = document.createElement("span");
  flake.classList.add("snowflake");
  if (noDelay) {
    flake.classList.add("no-delay");
  }
  return flake;
};

const addSnowflakes = (count, noDelay) => {
  console.log(`Adding ${count} snowflakes`);
  const container = document.body;
  for (let i = 0; i < count; i++) {
    container.appendChild(createSnowflake(noDelay));
  }
};

const getDaysTilXmas = () => {
  const xmas = new Date(2020, 11, 25);
  const now = new Date();
  const millisecondsToDays = (ms) => ms / (1000 * 60 * 60 * 24);
  const daysTilXmas = millisecondsToDays(xmas - now);
  return daysTilXmas;
};

const getSnowflakeCount = () => {
  const wholeDays = Math.ceil(getDaysTilXmas());
  const start = 32;
  const snowflakeRate = 10;
  const snowflakeCount = (start - wholeDays) * snowflakeRate;
  return snowflakeCount;
};

document.addEventListener("DOMContentLoaded", () => {
  addSnowflakes(getSnowflakeCount());
  setInterval(() => {
    Math.round(Math.random()) && addSnowflakes(1);
  }, 10 * 1000);

  var myShakeEvent = new Shake({
    threshold: 15, // optional shake strength threshold
    timeout: 1000, // optional, determines the frequency of event generation
  });
  myShakeEvent.start();
  window.addEventListener(
    "shake",
    () => {
      console.log(arguments);
      addSnowflakes(Math.ceil(10 + Math.random() * 30), true);
    },
    false
  );
});
