// import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Pool } from 'pg';
import ms from 'ms';

const secretKey = 'your_secret_key';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecomm-store',
  password: '12345',
  port: 9098,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { username, password } = req.body;

  try {
    const client = await pool.connect();
    const query = 'SELECT username, password FROM users WHERE username = $1';
    const result = await client.query(query, [username]);
    const user = result.rows[0]; // Assuming there's only one user with this username

    if (!user) {

      return res.status(401).json({ message: 'Authentication failed' });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (passwordsMatch) {
      // Generate a JWT token upon successful login
      const token = jwt.sign({ username }, secretKey, { expiresIn: ms('10h') });

      res.json({ token });
    } else {
      // alert('Error')
      res.status(401).json({ message: 'Authentication failed' });
    }

    client.release();
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
