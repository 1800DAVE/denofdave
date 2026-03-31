const fetch = require('node-fetch');

export default async function handler(req, res) {
  // Allow CodePen to talk to this script (CORS)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { compId } = req.query;
  const apiKey = 'f2d82061f4f502de26e5765d0555235cf8ce5134eefab0188c5c3ee95fdec52fa7f6826712cd4f0c2acf96d0b3d072499ac4f4ee3b9bb70ba3b62c56187b1af9';

  if (!compId) {
    return res.status(400).json({ error: 'Missing compId' });
  }

  try {
    const response = await fetch(`https://api-ifa.analyticom.de/api/live/competition/${compId}/stats/goals`, {
      headers: { 'apiKey': apiKey }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
