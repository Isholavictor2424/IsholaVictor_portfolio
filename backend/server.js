import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://portfolio-vtab.vercel.app",
    ],
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send-email", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const { data, error } = await resend.emails.send({
      from: "Decodius Portfolio <onboarding@resend.dev>",

      // For now, use the same email address you used
      // to create your Resend account.
      to: [process.env.CONTACT_EMAIL],

      replyTo: email,

      subject: `Portfolio Message from ${name}`,

      html: `
        <h2>New Portfolio Message</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Message:</strong></p>

        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to send message",
      });
    }

    console.log("Email sent:", data);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Send email error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
});

app.get("/", (req, res) => {
  res.send("Portfolio Contact API is running");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});