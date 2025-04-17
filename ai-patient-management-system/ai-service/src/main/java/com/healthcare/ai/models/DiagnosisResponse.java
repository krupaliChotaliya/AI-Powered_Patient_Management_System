package com.healthcare.ai.models;

public class DiagnosisResponse {
    private String diagnosis;
    public DiagnosisResponse(String diagnosis) {
        this.diagnosis = diagnosis;
    }
    public String getDiagnosis() {
        return diagnosis;
    }
    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }
}