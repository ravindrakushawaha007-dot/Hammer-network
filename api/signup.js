import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed.' });
  }

  const { name, email, password, role } = req.body;

  try {
    // Insert data into Neon database
    await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
      [name, email, password, role]
    );

    return res.status(200).json({ message: 'Signup successful!' });
  } catch (error) {
    return res.status(500).json({ error: 'Error saving data to the database.' });
  }
}
