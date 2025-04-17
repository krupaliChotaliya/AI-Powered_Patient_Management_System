package com.healthcare.doctor.controllers;

import com.healthcare.doctor.models.Appointment;
import com.healthcare.doctor.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<Appointment> scheduleAppointment(
            @RequestParam Long doctorId,
            @RequestParam Long patientId,
            @RequestParam String appointmentTime) {
        Appointment appointment = appointmentService.scheduleAppointment(doctorId, patientId, appointmentTime);
        return ResponseEntity.status(HttpStatus.CREATED).body(appointment);
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<List<Appointment>> getAppointmentDetails(@PathVariable Long id) {
//        List<Appointment> appointment = appointmentService.getAppointments(id);
//        return ResponseEntity.status(HttpStatus.CREATED).body(appointment);
//    }

    @GetMapping
    public ResponseEntity<List<Appointment>> getAppointments(@RequestParam Long patientId) {
        List<Appointment> appointments = appointmentService.getAppointments(patientId);
//        System.out.println("gdhfdh................");
        return ResponseEntity.ok(appointments);
    }
}
