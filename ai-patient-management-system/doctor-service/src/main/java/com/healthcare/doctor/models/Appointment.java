package com.healthcare.doctor.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long doctorId;
    private Long patientId;
    private String appointmentTime; // format: "YYYY-MM-DD HH:mm"

    // Getters and Setters
}