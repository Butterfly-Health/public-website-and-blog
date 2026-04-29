export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { email } = req.body ?? {};
    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "Email is required" });
    }

    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
    const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;

    if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
      console.error("Missing MailerLite env vars");
      return res
        .status(500)
        .json({ error: "Server misconfiguration: missing API keys" });
    }

    const response = await fetch(
      `https://api.mailerlite.com/api/v1/groups/${MAILERLITE_GROUP_ID}/subscribers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MAILERLITE_API_KEY}`,
        },
        body: JSON.stringify({ email: email, groups: [MAILERLITE_GROUP_ID], status: "active" }),
      }
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("MailerLite API error:", data);
      return res.status(response.status || 502).json({
        error: "Failed to subscribe to newsletter",
        details: data,
      });
    }

    return res.status(200).json({ success: true, message: "Successfully subscribed", data });
  } catch (err) {
    console.error("Newsletter handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
