
export const CELESTIAL_SOURCE_URL =
  "https://www.imo.net/calendar/";

export const CELESTIAL_SECONDARY_SOURCE_URL =
  "https://www.amsmeteors.org/calendar/";

export const CELESTIAL_DATA_META = {
  checkedOn: "2026-10-30",
  primarySource: "International Meteor Organization",
  secondarySource: "American Meteor Society",
  note:
    "Peak dates and active periods are calendar predictions. Local visibility, weather, and exact timing depend on location and conditions.",
};

export const CELESTIAL_EVENTS = [
  {
    id: "orionids-2026",
    name: "Orionids",
    category: "Meteor shower",
    activeStart: "2026-10-02",
    activeEnd: "2026-11-07",
    peakStart: "2026-10-21",
    peakEnd: "2026-10-22",
    intensity: "Medium-strength shower",
    moonlight: "Challenging",
    moonIlluminationAtPeak: 74,
    moonPhaseAtPeak: "Waxing gibbous",
    moonlightDetail:
      "The Moon was about 74% illuminated during the predicted peak. Moonlight can hide fainter meteors while the Moon is above the horizon.",
    description:
      "A medium-strength annual shower associated with Halley's Comet. Typical peak rates can reach around 10–20 meteors per hour under ideal observing conditions.",
    viewingTip:
      "Although the peak has passed, the shower remains active until November 7. Find a dark location, allow your eyes to adapt, and check local moonset and weather times.",
    source: CELESTIAL_SOURCE_URL,
    sourceName: "International Meteor Organization",
    secondarySource: CELESTIAL_SECONDARY_SOURCE_URL,
    dataStatus: "calendar-verified",
    checkedOn: "2026-10-30",
  },

  {
    id: "southern-taurids-2026",
    name: "Southern Taurids",
    category: "Meteor shower",
    activeStart: "2026-09-20",
    activeEnd: "2026-11-20",
    peakStart: "2026-11-04",
    peakEnd: "2026-11-05",
    intensity: "Fireball-rich",
    moonlight: "Favourable",
    moonIlluminationAtPeak: 25,
    moonPhaseAtPeak: "Waning crescent",
    moonlightDetail:
      "The Moon is expected to be about 25% illuminated during the peak, with generally favourable lunar conditions and limited moonlight interference.",
    description:
      "Known for occasional bright fireballs, the Southern Taurids have an annual component as well as a fireball-rich component near early November.",
    viewingTip:
      "Watch a broad area of dark sky rather than one point. Give yourself a long observing session because activity can be intermittent.",
    source: CELESTIAL_SOURCE_URL,
    sourceName: "International Meteor Organization",
    secondarySource: CELESTIAL_SECONDARY_SOURCE_URL,
    dataStatus: "calendar-verified",
    checkedOn: "2026-10-30",
  },

  {
    id: "northern-taurids-2026",
    name: "Northern Taurids",
    category: "Meteor shower",
    activeStart: "2026-10-20",
    activeEnd: "2026-12-10",
    peakStart: "2026-11-11",
    peakEnd: "2026-11-12",
    intensity: "Fireball-rich",
    moonlight: "Very favourable",
    moonIlluminationAtPeak: 4,
    moonPhaseAtPeak: "Waxing crescent",
    moonlightDetail:
      "The Moon is expected to be about 4% illuminated at the peak, offering very favourable lunar conditions with little moonlight interference.",
    description:
      "A later-season Taurid shower. Its activity overlaps with the Southern Taurids, and the two showers can contribute to fireball sightings during the same period.",
    viewingTip:
      "Choose a location away from direct artificial lighting, and keep watching for bright meteors even during quieter periods.",
    source: CELESTIAL_SOURCE_URL,
    sourceName: "International Meteor Organization",
    secondarySource: CELESTIAL_SECONDARY_SOURCE_URL,
    dataStatus: "calendar-verified",
    checkedOn: "2026-10-30",
  },

  {
    id: "leonids-2026",
    name: "Leonids",
    category: "Meteor shower",
    activeStart: "2026-11-06",
    activeEnd: "2026-11-30",
    peakStart: "2026-11-16",
    peakEnd: "2026-11-17",
    intensity: "Fast meteors",
    moonlight: "Mixed",
    moonIlluminationAtPeak: 39,
    moonPhaseAtPeak: "Waxing crescent",
    moonlightDetail:
      "The Moon is expected to be about 39% illuminated. Moonlight may obscure some fainter meteors while the Moon is above the horizon.",
    description:
      "Associated with comet 55P/Tempel-Tuttle, the Leonids are famous for historic meteor storms. Those exceptional storms are not guaranteed in an ordinary year.",
    viewingTip:
      "Plan for a long session in dark surroundings. Look across the sky rather than staring only toward the constellation Leo.",
    source: CELESTIAL_SOURCE_URL,
    sourceName: "International Meteor Organization",
    secondarySource: CELESTIAL_SECONDARY_SOURCE_URL,
    dataStatus: "calendar-verified",
    checkedOn: "2026-10-30",
  },

  {
    id: "geminids-2026",
    name: "Geminids",
    category: "Meteor shower",
    activeStart: "2026-12-04",
    activeEnd: "2026-12-17",
    peakStart: "2026-12-13",
    peakEnd: "2026-12-14",
    intensity: "Major shower",
    moonlight: "Favourable",
    moonIlluminationAtPeak: 15,
    moonPhaseAtPeak: "Waxing crescent",
    moonlightDetail:
      "The Moon is expected to be about 15% illuminated around the peak, generally providing favourable lunar conditions.",
    description:
      "One of the strongest annual meteor showers, often producing bright, sometimes colourful meteors. Its activity can be rewarding before midnight as well as later at night.",
    viewingTip:
      "Dress warmly, use a reclining chair if possible, and allow a generous observing window instead of checking the sky for only a few minutes.",
    source: CELESTIAL_SOURCE_URL,
    sourceName: "International Meteor Organization",
    secondarySource: CELESTIAL_SECONDARY_SOURCE_URL,
    dataStatus: "calendar-verified",
    checkedOn: "2026-10-30",
  },

  {
    id: "ursids-2026",
    name: "Ursids",
    category: "Meteor shower",
    activeStart: "2026-12-17",
    activeEnd: "2026-12-26",
    peakStart: "2026-12-21",
    peakEnd: "2026-12-22",
    intensity: "Subtle display",
    moonlight: "Challenging",
    moonIlluminationAtPeak: 89,
    moonPhaseAtPeak: "Waxing gibbous",
    moonlightDetail:
      "The Moon is expected to be about 89% illuminated. Significant moonlight interference is expected while it is above the horizon.",
    description:
      "A smaller shower linked to comet 8P/Tuttle. It usually produces lower rates than the Geminids and is best suited to patient observers in the Northern Hemisphere.",
    viewingTip:
      "Look for the darkest available location and check moonset before observing. Brighter meteors may still be visible despite lunar interference.",
    source: CELESTIAL_SOURCE_URL,
    sourceName: "International Meteor Organization",
    secondarySource: CELESTIAL_SECONDARY_SOURCE_URL,
    dataStatus: "calendar-verified",
    checkedOn: "2026-10-30",
  },

  {
    id: "quadrantids-2027",
    name: "Quadrantids",
    category: "Meteor shower",
    activeStart: "2026-12-28",
    activeEnd: "2027-01-12",
    peakStart: "2027-01-03",
    peakEnd: "2027-01-04",
    intensity: "Short peak window",
    moonlight: "Favourable",
    moonIlluminationAtPeak: 18,
    moonPhaseAtPeak: "Waning crescent",
    moonlightDetail:
      "The Moon is expected to be about 18% illuminated, offering generally favourable lunar conditions.",
    description:
      "A potentially strong shower with a relatively brief maximum. Its short peak window makes timing particularly important.",
    viewingTip:
      "Be ready before the predicted peak and check the local forecast. The radiant's northerly position means visibility depends strongly on location.",
    source: CELESTIAL_SOURCE_URL,
    sourceName: "International Meteor Organization",
    secondarySource: CELESTIAL_SECONDARY_SOURCE_URL,
    dataStatus: "calendar-verified",
    checkedOn: "2026-10-30",
  },

  {
    id: "lyrids-2027",
    name: "Lyrids",
    category: "Meteor shower",
    activeStart: "2027-04-14",
    activeEnd: "2027-04-30",
    peakStart: "2027-04-21",
    peakEnd: "2027-04-22",
    intensity: "Medium-strength shower",
    moonlight: "Challenging",
    moonIlluminationAtPeak: 100,
    moonPhaseAtPeak: "Full Moon",
    moonlightDetail:
      "A full Moon is predicted around the peak. Bright moonlight is likely to make fainter meteors more difficult to see.",
    description:
      "An annual shower that can provide several nights of useful activity around its maximum. It is also known for occasional bright meteors.",
    viewingTip:
      "Check the Moon's local rise and set times. If the Moon is above the horizon, focus on a darker portion of sky and keep expectations realistic.",
    source: CELESTIAL_SOURCE_URL,
    sourceName: "International Meteor Organization",
    secondarySource: CELESTIAL_SECONDARY_SOURCE_URL,
    dataStatus: "calendar-verified",
    checkedOn: "2026-10-30",
  },

  {
    id: "eta-aquariids-2027",
    name: "Eta Aquariids",
    category: "Meteor shower",
    activeStart: "2027-04-19",
    activeEnd: "2027-05-28",
    peakStart: "2027-05-05",
    peakEnd: "2027-05-06",
    intensity: "Swift meteors",
    moonlight: "Very favourable",
    moonIlluminationAtPeak: 2,
    moonPhaseAtPeak: "Waning crescent",
    moonlightDetail:
      "The Moon is expected to be about 2% illuminated at the peak, offering very favourable lunar conditions.",
    description:
      "Associated with Halley's Comet, the Eta Aquariids are swift meteors. Their rates are generally strongest in southern tropical regions, while observers farther north often benefit from watching before dawn.",
    viewingTip:
      "Try observing before dawn from a dark location with an open view toward the eastern sky. Actual rates depend on your latitude and local conditions.",
    source: CELESTIAL_SOURCE_URL,
    sourceName: "International Meteor Organization",
    secondarySource: CELESTIAL_SECONDARY_SOURCE_URL,
    dataStatus: "calendar-verified",
    checkedOn: "2026-10-30",
  },
];
