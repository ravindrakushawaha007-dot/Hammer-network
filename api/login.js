import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed.' });
  }

  const { email, password } = req.body;

  try {
    // Fetch the user from the database by email
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    // If user does not exist
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'User not found.' });
    }

    const user = result.rows[0];

    // Check if password matches (assuming password is stored in plain text, but it's better to hash it)
    if (user.password !== password) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    return res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    return res.status(500).json({ error: 'Error logging in.' });
  }
}
