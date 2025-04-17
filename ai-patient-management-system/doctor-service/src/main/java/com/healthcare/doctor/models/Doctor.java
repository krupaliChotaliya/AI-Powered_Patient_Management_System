package com.healthcare.doctor.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String specialty;
    private String location;
    private String availableTime; // format: "HH:mm"

    // Getters and Setters
}