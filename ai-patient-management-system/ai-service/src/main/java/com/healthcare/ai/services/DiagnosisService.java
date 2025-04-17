package com.healthcare.ai.services;

import com.healthcare.ai.models.DiagnosisRequest;
import com.healthcare.ai.models.DiagnosisResponse;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Collections;
import java.util.concurrent.*;

@Service
public class DiagnosisService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private OllamaChatModel ollamaChatModel;

    private static final String API_GATEWAY_URL = "http://localhost:8080/patients/";

    public DiagnosisResponse analyzeSymptoms(DiagnosisRequest request, String token) {
        CompletableFuture<String> patientDataFuture = fetchPatientData(request.getPatientId(), token);

        String patientData;
        try {
            patientData = patientDataFuture.get();
        } catch (Exception e) {
            return new DiagnosisResponse("Error fetching patient data.");
        }

        String diagnosis = callAIModel(request.getSymptoms(), patientData);
        return new DiagnosisResponse(diagnosis);
    }

    @Async
    protected CompletableFuture<String> fetchPatientData(Long patientId, String token) {
        String url = API_GATEWAY_URL + patientId;

        // Set Headers with JWT Token
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, token);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Make the request
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return CompletableFuture.completedFuture(response.getBody());
    }

    private String callAIModel(java.util.List<String> symptoms, String patientData) {
        ExecutorService executor = Executors.newSingleThreadExecutor();
        Future<String> future = executor.submit(() -> {
            String promptText = "Symptoms: " + String.join(", ", symptoms) +
                    ". Patient summary: " + patientData + ". Suggest possible diagnoses.";
            Prompt prompt = new Prompt(promptText);
            ChatResponse response = ollamaChatModel.call(prompt);

            if (response != null && response.getResults() != null && !response.getResults().isEmpty()) {
                return response.getResults().get(0).getOutput().getContent();
            }
            return "No diagnosis could be generated.";
        });

        try {
            return future.get(300, TimeUnit.SECONDS); // Set timeout to 10s
        } catch (TimeoutException e) {
            return "AI diagnosis took too long.";
        } catch (Exception e) {
            return "AI model error: " + e.getMessage();
        } finally {
            executor.shutdown();
        }
    }
}

