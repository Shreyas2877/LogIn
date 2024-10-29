# Login Application

<!-- <img src="" alt="Login Application" style="width:100%; max-width:600px; display:block; margin:auto;"/> -->

A secure, modern login application built with **React** on the frontend and **Spring Boot** on the backend, utilizing **JWT-based authentication** and **OAuth 2.0** (Google & GitHub) for account synchronization across multiple login options. It includes **multi-factor authentication (MFA)** with both email OTP and TOTP support (via Microsoft and Google Authenticators).

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Development Workflow](#development-workflow)
- [Contributing](#contributing)
- [License](#license)

## Features
<ul style="list-style-type: none;">
  <li>✅ <strong>JWT Authentication</strong> with cookies</li>
  <li>✅ <strong>OAuth 2.0 Login</strong> via Google and GitHub with seamless account synchronization</li>
  <li>✅ <strong>Multi-Factor Authentication (MFA)</strong>:
    <ul>
      <li>📧 Email OTP</li>
      <li>🔢 TOTP via Microsoft and Google Authenticators</li>
    </ul>
  </li>
  <li>✅ <strong>Dockerized Environment</strong> for easy setup and deployment</li>
  <li>✅ <strong>Kubernetes</strong> integration with Skaffold for simplified local development and testing</li>
</ul>

## Architecture
The application comprises three backend services and one frontend service:
<ul style="list-style-type: none;">
  <li>🔒 <strong>login-server</strong>: Manages user authentication and JWT-based authorization.</li>
  <li>🔑 <strong>oauth-server</strong>: Handles OAuth 2.0 login via Google and GitHub.</li>
  <li>🔢 <strong>totp-server</strong>: Manages TOTP-based MFA.</li>
  <li>💻 <strong>login-client</strong>: React-based frontend for user interaction.</li>
</ul>

<img src="./System Design Diagrams/Troj-App System Diagram Build 1.0.png" alt="Architecture Diagram" style="width:100%; max-width:600px; display:block; margin:auto;"/>

## Tech Stack
<ul style="list-style-type: none;">
  <li>🖥️ <strong>Frontend</strong>: React, JavaScript</li>
  <li>🛠️ <strong>Backend</strong>: Spring Boot, Java</li>
  <li>💾 <strong>Database</strong>: MySQL</li>
  <li>🔐 <strong>Authentication</strong>: JWT, OAuth 2.0, MFA (OTP & TOTP)</li>
  <li>🚀 <strong>Deployment</strong>: Docker, Kubernetes, Skaffold</li>
</ul>

## Prerequisites
Ensure you have the following installed:
<ul style="list-style-type: none;">
  <li>🐳 <strong>Docker</strong></li>
  <li>☸️ <strong>Kubernetes</strong> (Minikube or a similar local cluster)</li>
  <li>🚀 <strong>Skaffold</strong></li>
</ul>

## Installation
1. **Clone the repository:**
  ```bash
   git clone https://github.com/Shreyas2877/LogIn.git
   cd login-application
   ```
  
2. **Run the application with Skaffold:**
  ```bash
  skaffold dev
  ```
This will deploy the entire stack on your local Kubernetes cluster.

Usage
Visit https://login.dev to access the login application.

Note: Be sure to add the entry in your hosts file.

Development Workflow
Start the development environment:

```bash
  skaffold dev
```