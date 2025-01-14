### Design and Architecture Specification Document for **VitalEdge Frontend**

---

#### **Table of Contents**

1. Introduction  
    1.1 Purpose  
    1.2 Scope  
    1.3 Design Goals  
2. High-Level Architecture  
    2.1 Component-Based Architecture  
    2.2 Backend-Frontend Relationships  
    2.3 State Management  
3. Frontend Design Principles  
    3.1 Reusability  
    3.2 Modularity  
    3.3 Scalability  
    3.4 Security  
    3.5 Performance  
4. System Components  
    4.1 Folder Structure  
    4.2 Key Components  
5. Navigation and Routing  
    5.1 Route Structure  
    5.2 Private and Public Routes  
    5.3 XR Integration Points  
6. API Integration  
    6.1 Axios Configuration  
    6.2 Endpoints and Data Flow  
7. UX and Styling  
    7.1 Design Principles for SPA  
    7.2 Global and Shared Stylesheets  
    7.3 Accessibility (a11y)  
8. Security  
    8.1 Authentication and Authorization  
    8.2 API Security  
9. Extensibility and Future Design Considerations  
10. Conclusion  

---

### **1. Introduction**

#### **1.1 Purpose**
The purpose of this document is to describe the design and architecture of the **VitalEdge Frontend**, a React-based Single Page Application (SPA). It provides a comprehensive blueprint for developers, designers, and stakeholders to understand the system’s design principles, modularity, and extensibility, including its ability to integrate with the XR ecosystem.

#### **1.2 Scope**
This document focuses on the architecture and design principles of the traditional SPA components of the **VitalEdge Frontend**, covering its interactions with backend APIs, the navigation structure, state management, security, and scalability. While integration with XR (e.g., `/xr/dashboard`) is discussed at a high level, specific XR immersion design will be detailed in a separate document.

#### **1.3 Design Goals**
- Provide a **modular, reusable, and scalable** architecture.  
- Support **seamless integration with backend services** for real-time data and analytics.  
- Enable **responsive, accessible, and user-friendly interfaces**.  
- Ensure **secure and HIPAA-compliant handling of healthcare data**.  
- Lay the foundation for **future extensibility**, including enhanced XR features.

---

### **2. High-Level Architecture**

#### **2.1 Component-Based Architecture**
The frontend is a **component-driven system** with a **unidirectional data flow** managed by React. The core philosophy follows:
- **Reusable Components**: Shared components like modals, buttons, and forms are implemented in `src/components`.  
- **Page-Specific Components**: Major views like `Dashboard`, `PatientDetails`, and `GenomicDetails` are isolated in `src/pages`.  

Diagram of Component Relationships:  
```
App.js  
├── Navigation (Routes)  
├── Shared Components (Header, Footer)  
├── Pages  
│   ├── Dashboard  
│   ├── PatientDetails  
│   ├── GenomicDetails  
│   └── XR Pages (e.g., XRDashboard)  
└── Shared Modals and UI Elements
```

---

#### **2.2 Backend-Frontend Relationships**
The frontend communicates with the backend microservices through **RESTful APIs**, ensuring clear separation of concerns. Key relationships include:
- **Spring Boot API**: Patient management and medical record retrieval.  
- **Flask Genomic Pipeline**: Genomic data analysis and SNP details.  
- **AI Microservice**: Natural language processing and diagnostic insights.  
- **IoT Data Aggregator**: Real-time vitals from patient devices.  

---

#### **2.3 State Management**
- **Local State**: Managed using `useState` and `useEffect` for component-specific needs (e.g., modal visibility).  
- **Shared State**: Context API for authentication and global settings (e.g., user role, theme).  
- **Future Extension**: Redux can be adopted if the state grows complex.  

---

### **3. Frontend Design Principles**

#### **3.1 Reusability**
- Shared components like modals (`ModalWrapper`) and inputs ensure **consistency and maintainability**.  
- Common UI patterns are implemented once and reused across the application.  

#### **3.2 Modularity**
- Clear separation between `components`, `pages`, and `services` ensures isolation and testability.  

#### **3.3 Scalability**
- **Dynamic Routing**: Supports future additions of routes with minimal refactoring.  
- **Modular Codebase**: Each feature (e.g., XR support, AI insights) is encapsulated within its own module.  

#### **3.4 Security**
- Strict **JWT-based authentication**.  
- Role-based access control for sensitive data.  

#### **3.5 Performance**
- Optimized API calls with caching mechanisms for static or semi-static data.  
- Lazy-loading routes and components using `React.lazy()`.

---

### **4. System Components**

#### **4.1 Folder Structure**
```
/src  
  ├── components          // Reusable UI components  
  ├── pages               // Page-specific components  
  ├── services            // API configurations and calls  
  ├── styles              // Global and shared stylesheets  
  ├── App.js              // Main application entry point  
  ├── index.js            // Application initialization  
  └── xr                  // XR-specific views and components  
```

#### **4.2 Key Components**
- **Shared Components**: `Header`, `Footer`, `ModalWrapper`, `Button`.  
- **Pages**: `Dashboard`, `PatientDetails`, `GenomicDetails`.  

---

### **5. Navigation and Routing**

#### **5.1 Route Structure**
Routes are organized as:
- **Traditional SPA Routes**: `/dashboard`, `/patients/:id`, `/genomics`.  
- **XR Routes**: `/xr/dashboard`, `/xr/phenome`.  

#### **5.2 Private and Public Routes**
- **PrivateRoute** ensures routes like `/dashboard` are accessible only to authenticated users.  

#### **5.3 XR Integration Points**
- Links on the SPA dashboard navigate users to corresponding XR views (`/xr/dashboard`).  

---

### **6. API Integration**

#### **6.1 Axios Configuration**
- Centralized Axios instance with interceptors for JWT token management.  

#### **6.2 Endpoints and Data Flow**
- `/api/patients`: Fetch patient records.  
- `/api/vitals`: Fetch real-time vitals.  
- `/api/genomics`: Retrieve genomic data.  
- `/api/ai`: Generate patient insights.

---

### **7. UX and Styling**

#### **7.1 Design Principles for SPA**
- Mobile-first design, responsive across devices.  
- Clear visual hierarchy and intuitive navigation.  

#### **7.2 Global and Shared Stylesheets**
- **global.css**: Theme variables (`--primary-color`).  
- **Component Styles**: Scoped styles using CSS modules.  

#### **7.3 Accessibility (a11y)**
- Use ARIA attributes and keyboard navigation support.  

---

### **8. Security**

#### **8.1 Authentication and Authorization**
- **JWT tokens** are securely stored and attached to API requests.  

#### **8.2 API Security**
- All API calls use HTTPS, ensuring encrypted communication.  

---

### **9. Extensibility and Future Design Considerations**
- **Telemedicine Integration**: Add video consultation capabilities.  
- **Predictive Analytics**: Leverage ML models for risk prediction.  
- **XR Evolution**: Extend `/xr` routes with Unity or external 3D models.  

---

### **10. Conclusion**
This document outlines the design and architecture of the **VitalEdge Frontend**, ensuring its scalability, modularity, and extensibility. By adhering to these principles, the system will continue to evolve into a robust healthcare platform integrating traditional and immersive XR capabilities.