const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, specialization } = req.body;

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO nurses (email, password, first_name, last_name, specialization) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, first_name',
      [email, hashedPassword, firstName, lastName, specialization]
    );

    res.status(201).json({
      message: 'Nurse registered successfully',
      nurse: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query('SELECT * FROM nurses WHERE email = $1', [email]);
    const nurse = result.rows[0];

    if (!nurse) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcryptjs.compare(password, nurse.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: nurse.id, email: nurse.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, nurse: { id: nurse.id, email: nurse.email, firstName: nurse.first_name } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;