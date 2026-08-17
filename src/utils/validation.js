export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPhone = (phone) => {
  return /^\d{10}$/.test(phone);
};

export const isRequired = (value) => {
  return value !== null && value !== undefined && value.trim() !== '';
};
