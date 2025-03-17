
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
