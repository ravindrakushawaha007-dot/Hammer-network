import sql from "../lib/db.js";

export default async function handler(req, res) {
  try {
    // ✅ GET test
    if (req.method === "GET") {
      return res.status(200).json({ message: "Signup API working" });
    }

    // ❌ Only POST allowed
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Only POST allowed" });
    }

    const body = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // ✅ Insert into DB
    await sql`
      INSERT INTO users (name, email, password, role)
      VALUES (${name}, ${email}, ${password}, ${role})
    `;

    return res.status(200).json({ message: "Signup successful" });

  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
