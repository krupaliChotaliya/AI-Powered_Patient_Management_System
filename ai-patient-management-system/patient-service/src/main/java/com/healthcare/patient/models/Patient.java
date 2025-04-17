package com.healthcare.patient.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String contactNumber;

    @Column(nullable = false)
    private String bloodGroup;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String prescribedMedicine;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String disease;

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private String dateOfBirth;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String allergies;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String lifestyleFactors;

    @Column(name = "patient_id", nullable = false)
    private Long patientId;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
