export function submitContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  if (!data.name || !data.email || !data.subject || !data.message) {
    return {
      success: false,
      error: "All fields are required",
    };
  }

  if (!data.email.includes("@")) {
    return {
      success: false,
      error: "Invalid email address",
    };
  }

  // Simulate contact submission storage / notification
  console.log(`[Contact Message] Received from ${data.name} <${data.email}>:`);
  console.log(`Subject: ${data.subject}`);
  console.log(`Message: ${data.message}`);

  return {
    success: true,
    message: "Message received successfully",
    data: {
      name: data.name,
      email: data.email,
      subject: data.subject,
    },
  };
}
