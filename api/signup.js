import sql from "../lib/db.js";

export default async function handler(req, res) {
  try {
    // ✅ GET request handle karo
    if (req.method === "GET") {
      return res.status(200).json({ message: "API working" });
    }

    // ✅ POST request
    if (req.method === "POST") {
      const body = typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body;

      const { name, email, password, role } = body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "Missing fields" });
      }

      await sql`
        INSERT INTO users (name, email, password, role)
        VALUES (${name}, ${email}, ${password}, ${role})
      `;

      return res.status(200).json({ message: "Signup successful" });
    }

    // ❌ other methods
    return res.status(405).json({ message: "Method not allowed" });

  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}
