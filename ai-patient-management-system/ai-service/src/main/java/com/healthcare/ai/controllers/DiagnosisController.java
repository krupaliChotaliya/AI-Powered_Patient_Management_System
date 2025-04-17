package com.healthcare.ai.controllers;

import com.healthcare.ai.models.DiagnosisRequest;
import com.healthcare.ai.models.DiagnosisResponse;
import com.healthcare.ai.services.DiagnosisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/diagnosis")
public class DiagnosisController {

    @Autowired
    private DiagnosisService diagnosisService;

    @PostMapping("/suggest")
    public ResponseEntity<DiagnosisResponse> getDiagnosis(@RequestBody DiagnosisRequest request,
                                                          @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new DiagnosisResponse("Missing JWT token"));
        }

        DiagnosisResponse response = diagnosisService.analyzeSymptoms(request, token);
        return ResponseEntity.ok(response);
    }
}