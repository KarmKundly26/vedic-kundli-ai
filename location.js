// VEDIC KUNDLI AI - LOCATION & TIMEZONE DIAGNOSTIC

window.findBirthPlace = async function(place) {

  if (!place || place.trim().length < 2) {
    throw new Error("Please enter a valid birth place.");
  }

  // STEP 1: Find Birth Place

  const url =
    "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=" +
    encodeURIComponent(place);

  let response;

  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error(
      "OpenStreetMap Connection Failed: " + error.message
    );
  }

  if (!response.ok) {
    throw new Error(
      "OpenStreetMap Error: HTTP " + response.status
    );
  }

  const results = await response.json();

  if (!results.length) {
    throw new Error("Birth place not found.");
  }

  const latitude = Number(results[0].lat);
  const longitude = Number(results[0].lon);

  // STEP 2: Find Time Zone

  const timezoneURL =
    `https://timeapi.io/api/TimeZone/coordinate?latitude=${latitude}&longitude=${longitude}`;

  let timezoneResponse;

  try {
    timezoneResponse = await fetch(timezoneURL);
  } catch (error) {
    throw new Error(
      "TimeAPI Connection Failed: " + error.message
    );
  }

  if (!timezoneResponse.ok) {
    throw new Error(
      "TimeAPI Error: HTTP " + timezoneResponse.status
    );
  }

  const timezoneData = await timezoneResponse.json();

  if (!timezoneData.timeZone) {
    throw new Error("Time Zone could not be detected.");
  }

  return {
    name: results[0].display_name,
    latitude: latitude,
    longitude: longitude,
    timeZone: timezoneData.timeZone
  };
};

console.log("Location & Timezone Diagnostic Loaded");
