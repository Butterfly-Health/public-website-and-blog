import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;

if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
  console.error(
    "Missing required environment variables: MAILERLITE_API_KEY and MAILERLITE_GROUP_ID"
  );
  process.exit(1);
}

app.use(cors());
app.use(express.json());

app.post("/api/newsletter/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "Email is required" });
    }

    const response = await fetch(
      `https://api.mailerlite.com/api/v1/groups/${MAILERLITE_GROUP_ID}/subscribers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-MailerLite-ApiDocs-Warn": "yes",
          Authorization: `Bearer ${MAILERLITE_API_KEY}`,
        },
        body: JSON.stringify({
          email: email,
          groups: [MAILERLITE_GROUP_ID],
          status: "active",
        }),
      }
    );

    const data = (await response.json()) as {
      data?: { email: string; id: string };
      errors?: Record<string, string[]>;
    };

    if (!response.ok) {
      console.error("MailerLite API Error:", data);
      return res.status(response.status).json({
        error: "Failed to subscribe to newsletter",
        details: data.errors,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully subscribed to newsletter",
      data: data.data,
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
