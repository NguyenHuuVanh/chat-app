export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateFullName = (fullName) => {
  return fullName && fullName.trim().length > 0;
};

export const validateOnboardingData = (data) => {
  const { fullName, bio, nativeLanguage, learningLanguage, location } = data;

  const missingFields = [];
  if (!fullName) missingFields.push("fullName");
  if (!bio) missingFields.push("bio");
  if (!nativeLanguage) missingFields.push("nativeLanguage");
  if (!learningLanguage) missingFields.push("learningLanguage");
  if (!location) missingFields.push("location");

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};
