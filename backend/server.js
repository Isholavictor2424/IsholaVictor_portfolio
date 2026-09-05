import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 10000;

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://ishola-victor-portfolio.vercel.app",
].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Origin not allowed by CORS"));
  },

  methods: ["GET", "POST", "OPTIONS"],

  allowedHeaders: ["Content-Type"],

  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(
  express.json({
    limit: "10kb",
  })
);

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Decodius Portfolio API is running.",
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
  });
});

const cleanText = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[<>]/g, "")
    .trim();
};

const escapeHtml = (value) => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

app.post("/send-email", async (req, res) => {
  try {
    const name = cleanText(req.body?.name);
    const email = cleanText(req.body?.email);
    const message = cleanText(req.body?.message);

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please complete all fields.",
      });
    }

    if (name.length < 2 || name.length > 80) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid name.",
      });
    }

    if (!isValidEmail(email) || email.length > 120) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    if (message.length < 10 || message.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Your message should be between 10 and 2000 characters.",
      });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing.");

      return res.status(500).json({
        success: false,
        message: "Email service is not configured.",
      });
    }

    if (!process.env.CONTACT_EMAIL) {
      console.error("CONTACT_EMAIL is missing.");

      return res.status(500).json({
        success: false,
        message: "Contact destination is not configured.",
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    const { data, error } = await resend.emails.send({
      from: "Decodius Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL],
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
            <div style="max-width: 650px; margin: 0 auto; padding: 30px;">
              <h2 style="margin-bottom: 24px;">
                New Portfolio Message
              </h2>

              <p>
                <strong>Name:</strong><br />
                ${safeName}
              </p>

              <p>
                <strong>Email:</strong><br />
                ${safeEmail}
              </p>

              <p>
                <strong>Message:</strong><br />
                ${safeMessage}
              </p>

              <hr style="margin: 30px 0; border: 0; border-top: 1px solid #ddd;" />

              <p style="font-size: 12px; color: #64748b;">
                Sent through the Decodius portfolio contact form.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return res.status(502).json({
        success: false,
        message: "Unable to send your message right now.",
      });
    }

    console.log("Portfolio email sent:", data?.id);

    return res.status(200).json({
      success: true,
      message: "Thanks! Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("Unexpected server error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
});

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

app.use((error, _req, res, _next) => {
  console.error("API error:", error);

  if (error.message === "Origin not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "Request origin is not allowed.",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

app.listen(PORT, () => {
  console.log(`Decodius API running on port ${PORT}`);
});