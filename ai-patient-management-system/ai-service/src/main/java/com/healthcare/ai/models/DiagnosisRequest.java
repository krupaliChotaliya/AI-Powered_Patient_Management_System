package com.healthcare.ai.models;

import java.util.List;

public class DiagnosisRequest {
    private Long patientId;
    private List<String> symptoms;
    public Long getPatientId() {
        return patientId;
    }
    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }
    public List<String> getSymptoms() {
        return symptoms;
    }
    public void setSymptoms(List<String> symptoms) {
        this.symptoms = symptoms;
    }
}
