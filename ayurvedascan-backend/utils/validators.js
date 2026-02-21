exports.validateSymptoms = (symptoms) => {
  if (!Array.isArray(symptoms)) return false;
  return symptoms.every(s => typeof s === 'string' && s.length > 0);
};

exports.validateImage = (imageBase64) => {
  if (!imageBase64) return false;
  // Check if it's a valid base64 image
  const matches = imageBase64.match(/^data:image\/([a-zA-Z]*);base64,([^\"]*)$/);
  return !!matches;
};

exports.validateAge = (age) => {
  return typeof age === 'number' && age > 0 && age < 150;
};

exports.validateSeverity = (severity) => {
  return typeof severity === 'number' && severity >= 0 && severity <= 10;
};