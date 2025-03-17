
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with the publishable key
// In a production app, you would want to use environment variables
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// For creating a payment intent through your backend
export const createPaymentIntent = async (
  amount: number,
  paymentMethod: string
): Promise<{ clientSecret: string }> => {
  // In a real application, this would be a fetch call to your backend
  // which would create a payment intent and return the client secret
  
  // This is a mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        clientSecret: `pi_${Math.random().toString(36).substring(2, 15)}_secret_${Math.random().toString(36).substring(2, 15)}`,
      });
    }, 1000);
  });
};

export { stripePromise };
