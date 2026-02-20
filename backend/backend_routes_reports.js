const express = require('express');
const pool = require('../config/database');

const router = express.Router();

// Get patient reports
router.get('/patient/:patientId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM reports WHERE patient_id = $1 ORDER BY report_date DESC',
      [req.params.patientId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create report
router.post('/', async (req, res) => {
  try {
    const { patientId, reportType, content, vitals } = req.body;
    
    const result = await pool.query(
      'INSERT INTO reports (patient_id, report_type, content, vitals, report_date) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [patientId, reportType, content, JSON.stringify(vitals)]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;