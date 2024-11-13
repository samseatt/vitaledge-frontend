# VitalEdge Frontend

VitalEdge Frontend is a React-based application that serves as the user interface for the VitalEdge healthcare ecosystem. It allows healthcare professionals and patients to interact with patient data, view real-time vitals, access medical and genomic records, and utilize AI-driven insights.

## Project Overview

VitalEdge is a comprehensive healthcare platform that integrates real-time patient monitoring, personalized medicine, and genomic analysis with AI and machine learning technologies. The frontend provides an intuitive and accessible interface for healthcare providers to manage and view patient information.

### Key Features

- **User Authentication**: Secure login using JWT-based authentication.
- **Patient Management**: View, add, edit, and delete patient records.
- **Real-Time Vital Signs**: Display real-time health data from IoT devices.
- **Genomic Details**: View and expand patient genomic variants (SNPs) with specific details.
- **Intuitive Navigation**: Easy access to patient dashboards, details, and genomic data.

## Project Structure

The project is organized as follows:

# Project Structure

```plaintext
vitaledge-frontend
├── src
│   ├── components                  # Reusable UI components
│   ├── pages                       # Main application pages
│   │   ├── Dashboard.js
│   │   ├── Login.js
│   │   ├── PatientDetails.js
│   │   └── GenomicDetails.js
│   ├── services                    # Service files for API calls and utilities
│   │   └── axios.js
│   ├── styles                      # CSS stylesheets for each page
│   │   ├── Dashboard.css
│   │   ├── Login.css
│   │   ├── PatientDetails.css
│   │   └── GenomicDetails.css
│   ├── App.js                      # Root component
│   ├── index.js                    # Application entry point
│   └── ...
├── Dockerfile                      # Dockerfile for containerizing the application
└── README.md                       # Project documentation
```

## Prerequisites

- **Node.js** (version 14 or later)
- **npm** (Node Package Manager)
- **Docker** (for containerized setup)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/vitaledge-frontend.git
cd vitaledge-frontend
```

## Prerequisites

- **Node.js** (version 14 or later)
- **npm** (Node Package Manager)
- **Docker** (for containerized setup)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/vitaledge-frontend.git
cd vitaledge-frontend
```
<details>
    <summary>Explanation of Sections</summary>

    - Project Overview: Brief description and purpose of the frontend.
    - Setup Instructions: Step-by-step instructions for running the app locally or in Docker.
    - Docker Usage: Instructions on building and running with Docker.
    - Functionality Overview: Lists main pages and describes their purposes.
    - API Endpoints: Describes the backend and genomic pipeline endpoints the frontend interacts with.
    - Future Improvements: Suggested improvements to keep the project growing.
    - Contributing and License: Standard GitHub README sections for contributions and license information.
</details>