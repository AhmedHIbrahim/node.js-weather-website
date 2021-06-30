const request = require("request");
const getAddressGeoCode = (address, callback) => {
  const mapBoxToken =
    "pk.eyJ1IjoiZGlkb2RhIiwiYSI6ImNrcWZwN2UwazBqdDYyb3F1am40Njd2ZXYifQ.sN5UCOzvo70csi8b_EZKwQ";

  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${mapBoxToken}&limit=1 `;

  request({ url: geocodeUrl, json: true }, (error, { body } = {}) => {
    if (error) {
      callback(error, undefined);
    } else if (body.features.length <= 0) {
      callback("error occured, please select a valid address", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = getAddressGeoCode;
