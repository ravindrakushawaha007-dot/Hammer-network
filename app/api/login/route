import sql from "../lib/db.js";

export default async function handler(req, res) {
  try {
    // ✅ GET test
    if (req.method === "GET") {
      return res.status(200).json({ message: "Login API working" });
    }

    // ❌ Only POST allowed
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Only POST allowed" });
    }

    const body = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    const { email, password } = body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    // ✅ Check user
    const users = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (users.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = users[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Wrong password" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    });

  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
