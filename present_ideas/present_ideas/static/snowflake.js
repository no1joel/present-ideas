const createSnowflake = (noDelay) => {
  const flake = document.createElement("span");
  flake.classList.add("snowflake");
  if (noDelay) {
    flake.classList.add("no-delay");
  }
  return flake;
};

export const addSnowflakes = (count, noDelay) => {
  const container = document.body;
  for (let i = 0; i < count; i++) {
    container.appendChild(createSnowflake(noDelay));
  }
};

const getDaysTilXmas = () => {
  const now = new Date();
  const year = now.getUTCFullYear();
  let xmas = new Date(year, 11, 25);
  if (xmas < now) {
    xmas = new Date(year + 1, 11, 25);
  }
  const millisecondsToDays = (ms) => ms / (1000 * 60 * 60 * 24);
  const daysTilXmas = millisecondsToDays(xmas - now);
  return daysTilXmas;
};

export const getSnowflakeCount = () => {
  const wholeDays = Math.ceil(getDaysTilXmas());
  const start = 32;
  const snowflakeRate = 10;
  const snowflakeCount = (start - wholeDays) * snowflakeRate;
  return snowflakeCount;
};
