const express = require('express');
const pool = require('../config/database');

const router = express.Router();

// Get appointments
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT a.*, p.first_name, p.last_name FROM appointments a JOIN patients p ON a.patient_id = p.id ORDER BY a.appointment_date DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create appointment
router.post('/', async (req, res) => {
  try {
    const { patientId, appointmentDate, appointmentTime, reason, notes } = req.body;
    
    const result = await pool.query(
      'INSERT INTO appointments (patient_id, appointment_date, appointment_time, reason, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [patientId, appointmentDate, appointmentTime, reason, notes]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;