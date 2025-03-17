
// Card Number Validation (Luhn Algorithm)
export const validateCardNumber = (cardNumber: string): boolean => {
  const regex = /^[0-9]{13,19}$/;
  if (!regex.test(cardNumber)) return false;

  let sum = 0;
  let shouldDouble = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i));
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

// Constants
export const PIX_TIMEOUT = 300000; // 5 minutes in milliseconds

// Format card number with spaces
export const formatCardNumber = (value: string): string => {
  return value
    .replace(/[^\d]/g, '')
    .substring(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();
};

// Format expiration date
export const formatExpirationDate = (value: string): string => {
  return value
    .replace(/[^\d]/g, '')
    .substring(0, 4)
    .replace(/(.{2})/, '$1/')
    .trim();
};

// Validate expiration date
export const validateExpirationDate = (value: string): boolean => {
  const [monthStr, yearStr] = value.split('/');
  if (!monthStr || !yearStr) return false;
  
  const month = parseInt(monthStr);
  const year = parseInt(`20${yearStr}`);
  
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  
  return (
    month >= 1 && 
    month <= 12 && 
    (year > currentYear || (year === currentYear && month >= currentMonth))
  );
};

// Validate CVV
export const validateCVV = (value: string): boolean => {
  return /^[0-9]{3,4}$/.test(value);
};
