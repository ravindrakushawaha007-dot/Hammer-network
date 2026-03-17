import sql from "../lib/db.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      const user = await sql`
        SELECT * FROM users
        WHERE email = ${email} AND password = ${password}
      `;

      if (user.length > 0) {
        res.status(200).json({ message: "Login success", user: user[0] });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
