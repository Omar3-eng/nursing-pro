const express = require('express');
const pool = require('../config/database');

const router = express.Router();

// Get medications for patient
router.get('/patient/:patientId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM medications WHERE patient_id = $1 ORDER BY created_at DESC',
      [req.params.patientId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add medication
router.post('/', async (req, res) => {
  try {
    const { patientId, medicationName, dosage, frequency, startDate, endDate, reason } = req.body;
    
    const result = await pool.query(
      'INSERT INTO medications (patient_id, medication_name, dosage, frequency, start_date, end_date, reason) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [patientId, medicationName, dosage, frequency, startDate, endDate, reason]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;