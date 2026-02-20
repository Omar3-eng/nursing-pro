const express = require('express');
const pool = require('../config/database');

const router = express.Router();

// Get all patients
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM patients ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get patient by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM patients WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create patient
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, gender, phone, email, address, medicalHistory } = req.body;
    
    const result = await pool.query(
      'INSERT INTO patients (first_name, last_name, date_of_birth, gender, phone, email, address, medical_history) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [firstName, lastName, dateOfBirth, gender, phone, email, address, medicalHistory]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update patient
router.put('/:id', async (req, res) => {
  try {
    const { firstName, lastName, phone, email, address, medicalHistory } = req.body;
    
    const result = await pool.query(
      'UPDATE patients SET first_name = $1, last_name = $2, phone = $3, email = $4, address = $5, medical_history = $6, updated_at = NOW() WHERE id = $7 RETURNING *',
      [firstName, lastName, phone, email, address, medicalHistory, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;