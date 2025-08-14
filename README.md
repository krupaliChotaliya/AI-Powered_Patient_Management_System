# 🏥 AI-Powered Patient Management System

An **AI-powered Patient Management System** built using **Microservice Architecture** that helps patients digitize their medical history, get AI-based diagnosis suggestions, and find doctors easily.  

## 📌 Overview  
This project aims to modernize healthcare management by integrating **Artificial Intelligence** with patient records.  
Patients can securely store their medical history, consult AI for diagnosis suggestions, and search for nearby doctors based on their needs.  

## ✨ Features  
1. **🩺 Medical History Digitization**  
   - Patients can securely upload and manage their medical records.  
   - Organized history for easy access and future consultations.  

2. **🤖 AI-powered Diagnosis Suggestions**  
   - Integrated **Spring AI** with **Ollama model (DeepSeek R1)**.  
   - Patients can describe symptoms and get AI-driven diagnosis suggestions based on stored medical history.  

3. **👨‍⚕️ Doctor Search**  
   - Search for doctors based on specialization, location, and availability.  
   - Easy booking and contact options.  

## 🏗️ Architecture  
The system follows a **Microservice Architecture** to ensure scalability and maintainability.  
Each service handles a specific responsibility and communicates through REST APIs.  

**Main Services**:
- **Auth Service** – JWT-based authentication & authorization.  
- **Patient Service** – Medical history management & patient profiles.  
- **AI Service** – Handles AI diagnosis suggestions.  
- **Doctor Service** – Doctor database & search functionality.  

## 🛠️ Technology Stack  
- **Backend:** Spring Boot (REST API), Microservices Architecture  
- **AI Integration:** Spring AI, Ollama model (DeepSeek R1)  
- **Frontend:** HTML, CSS, JavaScript  
- **Authentication:** JWT Token-based security  
- **Database:** MySQL / PostgreSQL (as per configuration)  

## 🚀 Getting Started  

### Prerequisites  
Make sure you have the following installed:  
- **Java 17+**  
- **Maven**  
- **MySQL**  
- **Ollama Model (DeepSeek R1)** installed & running  

### Installation & Run  
```bash
# Clone the repository
git clone https://github.com/krupaliChotaliya/AI_Powered_PMS.git
cd AI_Powered_PMS

# Run each microservice separately
mvn spring-boot:run
