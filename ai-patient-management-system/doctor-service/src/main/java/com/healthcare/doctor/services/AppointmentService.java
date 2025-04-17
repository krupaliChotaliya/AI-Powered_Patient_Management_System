package com.healthcare.doctor.services;

import com.healthcare.doctor.models.Appointment;
import com.healthcare.doctor.repositories.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment scheduleAppointment(Long doctorId, Long patientId, String appointmentTime) {
        Appointment appointment = new Appointment();
        appointment.setDoctorId(doctorId);
        appointment.setPatientId(patientId);
        appointment.setAppointmentTime(appointmentTime);
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAppointments(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }
}
