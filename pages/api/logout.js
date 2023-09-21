
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Clear the client-side JWT token by sending an empty token
      res.status(200).json({ message: 'Logout successful', token: '' });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ message: 'Logout failed' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
