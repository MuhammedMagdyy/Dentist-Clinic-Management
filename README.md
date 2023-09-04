# Dentist Clinic Management - Graduation Project

## Table of Contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Features](#features)
- [Screenshots](#screenshots)
- [Schema](#schema)
- [Setup](#setup)

## Introduction
A website that manages clinics in the Faculty of Dentistry at October 6 University, optimizing reservations, patient transfers, and electronic diagnoses to replace paper records. It enhances care quality, reduces errors, facilitates communication among healthcare providers, and gathers health information for research and education. Ensuring access to patient diagnoses overcomes the limitations of paper records.

## Technologies
- JavaScript
- Nodejs (v18 or higher)
  - Express.js
- Sequelize (ORM)
- MySQL

## Features
- Patient Management:
  - Storage of patient information, including personal details and medical history.
  - Appointment scheduling for patients.
    
- Appointment Management:
  - Booking of appointments by nurses.

- Staff Management:
  - User accounts and roles for dentists, receptionists, and nurses.
  - Sending emails for resetting passwords.
 
- Medical Records:
  - Storage and retrieval of patient dental records.
 
- Security:
  - Access control and user authentication to protect patient data.

## Screenshots
**Nurse Services**

![nurse-services](https://github.com/MuhammedMagdyy/Dentist-Clinic-Management/assets/60513866/225eb641-2e0f-470b-a2f7-4ffe659fbe1a)

**Medical History**

![medical-history](https://github.com/MuhammedMagdyy/Dentist-Clinic-Management/assets/60513866/6f3a05a7-6222-485f-89f1-4793ed8806cc)

**Booking an Appointment**

![add-appointment](https://github.com/MuhammedMagdyy/Dentist-Clinic-Management/assets/60513866/31cde13a-1201-4853-8348-842077be0eaa)

## Schema
![schema](https://github.com/MuhammedMagdyy/Dentist-Clinic-Management/assets/60513866/549f7270-dbd8-44e5-b0d4-2053df5eac28)

## Setup
To set up this repository locally, follow these steps:

1. Clone the repository 
```
https://github.com/MuhammedMagdyy/Dentist-Clinic-Management.git
```
2. Change the project's directory
```
cd Dentist-Clinic-Management
```
3. Install [required packages](https://github.com/MuhammedMagdyy/Dentist-Clinic-Management/blob/main/package.json) using `npm install`
4. Configure the [environment variables](https://github.com/MuhammedMagdyy/Dentist-Clinic-Management/blob/main/.env.example)
5. Use `npm start` to run development mode
