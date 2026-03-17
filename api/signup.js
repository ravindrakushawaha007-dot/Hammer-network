import sql from "../lib/db.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, password, role } = req.body;

      await sql`
        INSERT INTO users (name, email, password, role)
        VALUES (${name}, ${email}, ${password}, ${role})
      `;

      res.status(200).json({ message: "Signup successful" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
