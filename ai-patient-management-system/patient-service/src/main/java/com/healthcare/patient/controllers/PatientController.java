package com.healthcare.patient.controllers;

import com.healthcare.patient.models.Patient;
import com.healthcare.patient.services.PatientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

//    @GetMapping("/{id}")
//    public Optional<Patient> getPatientById(@PathVariable Long id) {
//        return patientService.getPatientById(id);
//    }

    @PostMapping
    public Patient createPatient(@RequestBody Patient patient) {
        return patientService.savePatient(patient);
    }

    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
    }

    @GetMapping("/{patientId}")
    public ResponseEntity<List<Patient>> getPatientsByPatientId(@PathVariable Long patientId) {
        List<Patient> patients = patientService.getPatientsByPatientId(patientId);
//        System.out.println(patients);
        if (!patients.isEmpty()) {
            return ResponseEntity.ok(patients);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

