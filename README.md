# Login Application

![Placeholder for image]

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
- **JWT Authentication** with cookies
- **OAuth 2.0 Login** via Google and GitHub with seamless account synchronization
- **Multi-Factor Authentication (MFA)**:
  - Email OTP
  - TOTP via Microsoft and Google Authenticators
- **Dockerized Environment** for easy setup and deployment
- **Kubernetes** integration with Skaffold for simplified local development and testing

## Architecture
The application comprises three backend services and one frontend service:
- **login-server**: Manages user authentication and JWT-based authorization.
- **oauth-server**: Handles OAuth 2.0 login via Google and GitHub.
- **totp-server**: Manages TOTP-based MFA.
- **login-client**: React-based frontend for user interaction.

## Tech Stack
- **Frontend**: React, JavaScript
- **Backend**: Spring Boot, Java
- **Database**: MySQL
- **Authentication**: JWT, OAuth 2.0, MFA (OTP & TOTP)
- **Deployment**: Docker, Kubernetes, Skaffold

## Prerequisites
Ensure you have the following installed:
- **Docker**
- **Kubernetes** (Minikube or a similar local cluster)
- **Skaffold**

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/login-application.git
   cd login-application
