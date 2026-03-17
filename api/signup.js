
 import sql from "../lib/db.js";

export default async function handler(req, res) {
  try {
    console.log("METHOD:", req.method);

    // ✅ GET check
    if (req.method === "GET") {
      return res.status(200).json({ message: "API working" });
    }

    // ❌ only POST allowed
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Only POST allowed" });
    }

    console.log("BODY:", req.body);

    const body = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    const { name, email, password, role } = body;

    console.log("DATA:", name, email);

    // ✅ test query (IMPORTANT)
    const test = await sql`SELECT 1`;
    console.log("DB OK:", test);

    // ✅ insert
    await sql`
      INSERT INTO users (name, email, password, role)
      VALUES (${name}, ${email}, ${password}, ${role})
    `;

    return res.status(200).json({ message: "Signup successful" });

  } catch (err) {
    console.error("FULL ERROR:", err);
    return res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }
}
}
