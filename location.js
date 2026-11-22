// VEDIC KUNDLI AI - BIRTH PLACE & TIMEZONE FINDER

window.findBirthPlace = async function(place) {

  if (!place || place.trim().length < 2) {
    throw new Error("Please enter a valid birth place.");
  }

  // STEP 1: Find Birth Place
  const url =
    "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=" +
    encodeURIComponent(place);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Location service is temporarily unavailable.");
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

  const timezoneResponse = await fetch(timezoneURL);

  if (!timezoneResponse.ok) {
    throw new Error("Time Zone service is unavailable.");
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

console.log("Birth Place & Time Zone Finder Loaded");
