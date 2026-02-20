-- Create database
CREATE DATABASE nursing_pro;

-- Connect to the database
\c nursing_pro;

-- Nurses table
CREATE TABLE nurses (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  specialization VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patients table
CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(10),
  phone VARCHAR(20),
  email VARCHAR(255),
  address TEXT,
  medical_history TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments table
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  reason VARCHAR(255),
  notes TEXT,
  status VARCHAR(20) DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- Medications table
CREATE TABLE medications (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL,
  medication_name VARCHAR(255) NOT NULL,
  dosage VARCHAR(100),
  frequency VARCHAR(100),
  start_date DATE NOT NULL,
  end_date DATE,
  reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- Reports table
CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL,
  report_type VARCHAR(100),
  content TEXT,
  vitals JSON,
  report_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- Schedules table
CREATE TABLE schedules (
  id SERIAL PRIMARY KEY,
  nurse_id INTEGER NOT NULL,
  shift_date DATE NOT NULL,
  shift_start TIME NOT NULL,
  shift_end TIME NOT NULL,
  status VARCHAR(20) DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (nurse_id) REFERENCES nurses(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_patients_email ON patients(email);
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_medications_patient ON medications(patient_id);
CREATE INDEX idx_reports_patient ON reports(patient_id);
CREATE INDEX idx_schedules_nurse ON schedules(nurse_id);