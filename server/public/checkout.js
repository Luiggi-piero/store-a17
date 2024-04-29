// This is your test publishable API key.
const stripe = Stripe("pk_test_51OqJ2dFqCl4i3LlWH3YgTRoJHdvkk7ds4r8jMQrdgXXjLEJ5jhw9Xq367aVDfKEGvmr0edWyIIWZR7cYH8RrHoun00mB8ceTDf");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}