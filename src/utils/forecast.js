const fetch = require("node-fetch");
const moment = require("moment");
const queryString = require("query-string");

const getForecast = (latitude, longitude, callback) => {
  // set the Timelines GET endpoint as the target URL
  const getTimelineURL = "https://api.tomorrow.io/v4/timelines";

  // get your key from app.tomorrow.io/development/keys
  const apikey = "P5ztu5GjyyTIQbqcuXI1YpND19oVqFzz";

  // pick the location, as a latlong pair
  let location = [latitude, longitude];

  // list the fields
  const fields = [
    "precipitationIntensity",
    "precipitationType",
    "windSpeed",
    "windGust",
    "windDirection",
    "temperature",
    "temperatureApparent",
    "cloudCover",
    "cloudBase",
    "cloudCeiling",
    "weatherCode",
  ];

  // choose the unit system, either metric or imperial
  const units = "imperial";

  // set the timesteps, like "current", "1h" and "1d"
  const timesteps = ["current", "1h", "1d"];

  // configure the time frame up to 6 hours back and 15 days out
  const now = moment.utc();
  const startTime = moment.utc(now).add(0, "minutes").toISOString();
  const endTime = moment.utc(now).add(1, "days").toISOString();

  // specify the timezone, using standard IANA timezone format
  const timezone = "America/New_York";

  // request the timelines with all the query string parameters as options
  const getTimelineParameters = queryString.stringify(
    {
      apikey,
      location,
      fields,
      units,
      timesteps,
      startTime,
      endTime,
      timezone,
    },
    { arrayFormat: "comma" }
  );

  fetch(getTimelineURL + "?" + getTimelineParameters, { method: "GET" })
    .then((result) => result.json())
    .then((json) => {
      const { temperature, windSpeed, precipitationIntensity } =
        json.data.timelines[0].intervals[0].values;
      callback(
        undefined,
        `The temperature is ${temperature} degree outside. The wind speed is ${windSpeed}.`
      );
    })
    .catch((error) => callback(error, undefined));
};

module.exports = getForecast;
