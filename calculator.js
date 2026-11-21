// VEDIC KUNDLI AI - CALCULATION ENGINE
// Uses Vedic Ephemeris with Lahiri Ayanamsha

import {
  getSkySnapshot,
  getAscendant
} from "https://cdn.jsdelivr.net/gh/heirmez/vedic-ephemeris@main/index.mjs";

// Main Kundli Calculation Function
window.calculateVedicChart = function(date, latitude, longitude) {

  const birthDate = new Date(date);

  if (
    isNaN(birthDate.getTime()) ||
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    Math.abs(latitude) > 90 ||
    Math.abs(longitude) > 180
  ) {
    throw new Error("Please enter valid birth date and coordinates.");
  }

  // Calculate planetary positions
  const sky = getSkySnapshot(birthDate);

  // Calculate Ascendant
  const lagna = getAscendant({
    date: birthDate,
    lat: latitude,
    lon: longitude
  });

  // Calculate planetary houses
  const planets = Object.entries(sky.planets).map(
    ([name, planet]) => {

      const house =
        ((planet.rashi.index - lagna.rashi.index + 12) % 12) + 1;

      return {
        name: name,
        longitude: planet.siderealLon,
        sign: planet.rashi.name,
        signDegree: planet.rashiDeg,
        nakshatra: planet.nakshatra.name,
        nakshatraPada: planet.nakshatraPada,
        retrograde: planet.retrograde,
        house: house
      };
    }
  );

  // Final Kundli Data
  return {
    calculationSystem: "Vedic Sidereal",
    ayanamsa: "Lahiri",
    birthDate: birthDate.toISOString(),

    lagna: {
      sign: lagna.rashi.name,
      degree: lagna.rashiDeg,
      nakshatra: lagna.nakshatra.name,
      pada: lagna.nakshatraPada
    },

    planets: planets
  };
};

console.log("Vedic Kundli Calculation Engine Loaded");
