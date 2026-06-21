export function subscribeNewsletter(email: string) {
  if (!email || !email.includes("@")) {
    return {
      success: false,
      error: "Invalid email address",
    };
  }

  // Simulate subscription storage (e.g. database insert)
  console.log(`[Newsletter] Subscribed email: ${email}`);

  return {
    success: true,
    message: "Subscription successful",
    email,
  };
}
