package com.healthcare.patient.repositories;

import com.healthcare.patient.models.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    // Custom query methods can be defined here if needed
    List<Patient> findByPatientId(Long patientId);
}

