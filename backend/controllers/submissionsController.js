// @desc    Newsletter subscription
// @route   POST /api/newsletter
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    console.log(`[Submissions - Newsletter] New signup: ${email}`);

    res.json({
      success: true,
      message: "Subscription successful",
      email
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Contact form submissions
// @route   POST /api/contact
export const submitContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    console.log(`[Submissions - Contact] Received message from ${name} <${email}>:`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);

    res.json({
      success: true,
      message: "Message received successfully",
      data: { name, email, subject }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
