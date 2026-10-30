const ALLOWED_SURVEYS = [
  "DSS",
  "DSS2 Red",
  "DSS2 Blue",
  "2MASS-J",
  "2MASS-H",
  "2MASS-K",
  "GALEX Near UV",
  "GALEX Far UV"
];

export function validateSkyViewInput(position, survey) {
  if (!position || typeof position !== "string") {
    return "A sky position or object name is required.";
  }

  if (position.length > 100) {
    return "Position is too long.";
  }

  if (!survey || !ALLOWED_SURVEYS.includes(survey)) {
    return "Unsupported survey selection.";
  }

  return null;
}