### Requirements Document for VitalEdge Frontend

This document is structured in a format that conforms to Business Analysis Body of Knowledge (BABOK) style.

### **1. Business Needs**

#### **1.1 Problem Statement**
Healthcare providers face challenges managing patient data, genomic insights, and real-time vitals within an integrated and intuitive system. The need for a scalable, modular, and user-friendly frontend interface is critical to enable effective decision-making and seamless access to healthcare data.

#### **1.2 Business Goals**
- Deliver actionable insights for healthcare providers in a user-friendly manner.
- Ensure secure, real-time access to patient and genomic data.
- Provide a robust interface that integrates with the backend services and supports future immersive XR extensions.
- Enable modular scalability to accommodate future requirements like telemedicine, predictive analytics, and extended reality features.

---

### **2. Stakeholders**

#### **2.1 Primary Stakeholders**
- **Healthcare Providers**: Doctors, nurses, and clinical staff using the system for patient management.
- **Patients**: Individuals accessing their health information.
- **System Administrators**: Responsible for managing users, roles, and access controls.

#### **2.2 Secondary Stakeholders**
- **Developers**: Responsible for maintaining and extending the frontend.
- **Data Scientists**: Using the frontend for data insights and AI-driven analytics.
- **Regulators**: Ensuring compliance with data security and healthcare regulations like HIPAA.

---

### **3. Scope**

#### **3.1 Functional Scope**
- **Authentication and Security**:
  - JWT-based login and session management.
  - Role-based access control (e.g., Admin, Doctor, Patient).
  - Secure handling of sensitive healthcare data.
  
- **Dashboard**:
  - Display patient records, real-time vitals, and alerts.
  - Provide navigation links to detailed patient pages, genomic data, and XR views.

- **Patient Management**:
  - CRUD operations for patient profiles and vitals.
  - View historical and real-time patient data.

- **Genomic Data**:
  - Fetch and display genomic insights with interactive tools.
  - Enable integration with XR views for immersive genomic analysis.

- **AI-Powered Insights**:
  - Summarized reports and diagnostics based on patient records.
  - Provide natural language querying capabilities.

- **Integration Support for XR Pages**:
  - Ensure seamless transitions between traditional pages and XR pages.
  - Provide entry points to XR views directly from SPA components.

#### **3.2 Non-Functional Scope**
- **Performance**:
  - Optimize rendering for large datasets (e.g., genomic data).
  - Ensure low latency for real-time data updates.
  
- **Scalability**:
  - Modular architecture to support future feature expansions.
  - Scalable deployment using containerized infrastructure (e.g., Docker).

- **Usability**:
  - Responsive design to ensure compatibility with multiple devices.
  - Accessible UI for all user roles and devices.

- **Security**:
  - Strict adherence to HIPAA and healthcare data protection standards.
  - Implement secure token storage and encrypted data communication.

---

### **4. Business Requirements**

#### **4.1 High-Level Requirements**
1. **Authentication and Role Management**:
   - Users must be authenticated with JWT tokens.
   - Role-based access must determine the data and features users can access.
   - User sessions must expire after inactivity or token expiry.

2. **Dashboard Functionality**:
   - Display patient summaries, real-time alerts, and navigation to detailed pages.
   - Highlight critical patient conditions using visual indicators.

3. **Patient Management**:
   - Support CRUD operations for managing patient profiles and medical records.
   - Provide historical and real-time views of vitals.

4. **Genomic Data Integration**:
   - Allow users to explore genomic data interactively.
   - Provide expandable views for detailed analysis of specific variants.

5. **AI Insights**:
   - Generate diagnostic reports and recommendations based on historical and real-time data.
   - Integrate natural language queries for intuitive data interaction.

6. **XR Page Integration**:
   - Provide seamless navigation to XR views from SPA components.
   - Support shared state between traditional and XR views for smooth transitions.

#### **4.2 Derived Requirements**
- Utilize a centralized state management solution (e.g., React Context or Redux) for shared states between components.
- Modularize routing to differentiate between traditional (`/dashboard`) and XR (`/xr/dashboard`) routes.
- Create API abstractions to allow reusability across traditional and XR components.

---

### **5. Functional Requirements**

#### **5.1 Authentication**
- FR1.1: Users must log in with their credentials, validated via the backend API.
- FR1.2: The frontend must attach JWT tokens to all API requests.
- FR1.3: On token expiry, redirect the user to the login page and provide a clear message.

#### **5.2 Dashboard**
- FR2.1: Display a list of patients with sortable and searchable attributes.
- FR2.2: Provide real-time alerts for patients with abnormal vitals.
- FR2.3: Allow navigation to detailed patient pages and XR dashboards.

#### **5.3 Patient Management**
- FR3.1: Allow clinicians to add, edit, and delete patient profiles.
- FR3.2: Enable viewing of historical vitals in chart form.
- FR3.3: Allow the addition of new vitals via modals.

#### **5.4 Genomic Data**
- FR4.1: Display a list of genomic variants (e.g., SNPs) for selected patients.
- FR4.2: Provide an expandable view for detailed analysis of each variant.
- FR4.3: Enable seamless navigation to XR genomic visualizations.

#### **5.5 AI-Powered Insights**
- FR5.1: Summarize patient history with AI-driven analytics.
- FR5.2: Support free-form queries to retrieve specific patient information.

#### **5.6 XR Integration**
- FR6.1: Ensure navigation links to XR views are visible only for authorized users.
- FR6.2: Provide state-sharing mechanisms to pass data seamlessly to XR components.
- FR6.3: Ensure consistent visual styling between traditional and XR pages.

---

### **6. Non-Functional Requirements**

#### **6.1 Performance**
- NFR1.1: All API responses must be processed within 300ms.
- NFR1.2: The frontend must support real-time updates at intervals of 1 second for IoT data.

#### **6.2 Scalability**
- NFR2.1: The system must handle a 100% increase in user load without degradation.
- NFR2.2: All modular components must be reusable in future feature expansions.

#### **6.3 Usability**
- NFR3.1: Ensure compatibility with all modern browsers (Chrome, Edge, Firefox, Safari).
- NFR3.2: Use WCAG 2.1 guidelines for accessibility compliance.

#### **6.4 Security**
- NFR4.1: All sensitive data must be encrypted during transit and at rest.
- NFR4.2: Role-based access control must prevent unauthorized actions.

---

### **7. Assumptions and Constraints**

#### **7.1 Assumptions**
- All backend APIs provide data in RESTful JSON format.
- XR pages will use shared APIs and data schemas for consistency.
- Clinicians and administrators will have access to modern web browsers.

#### **7.2 Constraints**
- Must comply with HIPAA and other healthcare regulations.
- The frontend must be deployable using Docker in a cloud environment.

---

### **8. Acceptance Criteria**

#### **8.1 Functional Tests**
- Authentication: Users must log in successfully with valid credentials and see an appropriate error message for invalid credentials.
- Dashboard: Display patient data with the ability to sort, search, and filter.
- Patient Management: Ensure CRUD operations work and display confirmation messages.

#### **8.2 Integration Tests**
- Ensure seamless transitions between `/dashboard` and `/xr/dashboard`.
- Verify API calls handle token expiry and unauthorized responses gracefully.

#### **8.3 Usability Tests**
- Test compatibility across modern browsers.
- Verify responsive design on devices with different screen sizes.

---

### **9. Glossary**
- **SPA**: Single Page Application.
- **JWT**: JSON Web Token, used for authentication.
- **XR**: Extended Reality, encompassing virtual and augmented reality.
- **SNP**: Single Nucleotide Polymorphism, a type of genomic variant.

---

### **10. Conclusion**
This requirements document ensures the **VitalEdge Frontend** delivers a scalable, user-friendly, and secure platform for clinicians and patients. By addressing traditional functionalities and laying the groundwork for XR integrations, the document provides a comprehensive framework for current development and future expansions.