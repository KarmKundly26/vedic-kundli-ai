// VEDIC KUNDLI AI - BIRTH PLACE FINDER

window.findBirthPlace = async function(place) {

  if (!place || place.trim().length < 2) {
    throw new Error("Please enter a valid birth place.");
  }

  const url =
    "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=" +
    encodeURIComponent(place);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Location service is temporarily unavailable.");
  }

  const results = await response.json();

  if (!results.length) {
    throw new Error("Birth place not found. Please try another name.");
  }

  return {
    name: results[0].display_name,
    latitude: Number(results[0].lat),
    longitude: Number(results[0].lon)
  };
};

console.log("Birth Place Finder Loaded");
