<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Application Documentation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        header, .content {
            max-width: 800px;
            margin: auto;
            padding: 20px;
        }
        header {
            text-align: center;
            padding: 40px 20px;
            background: #4A90E2;
            color: #fff;
            border-bottom: 4px solid #2C3E50;
        }
        header h1 {
            font-size: 2.5em;
            margin-bottom: 0.2em;
        }
        header img {
            max-width: 100%;
            height: auto;
            margin: 20px 0;
        }
        .content h2 {
            color: #4A90E2;
            border-bottom: 2px solid #ddd;
            padding-bottom: 8px;
            margin-top: 1.5em;
        }
        .content p, .content li {
            font-size: 1.1em;
            margin-bottom: 15px;
        }
        .content ul {
            list-style-type: disc;
            margin-left: 20px;
        }
        code, pre {
            background-color: #f3f3f3;
            padding: 5px;
            font-family: Consolas, monospace;
            font-size: 1em;
            border-radius: 4px;
            display: inline-block;
        }
        footer {
            text-align: center;
            padding: 10px;
            font-size: 0.9em;
            color: #777;
            background-color: #4A90E2;
            color: #fff;
        }
        footer a {
            color: #fff;
            text-decoration: none;
        }
    </style>
</head>
<body>

<header>
    <h1>Login Application</h1>
    <p><em>A modern, secure login system built with React and Spring Boot</em></p>
    <img src="path/to/your/image.jpg" alt="Application Overview" placeholder>
</header>

<div class="content">
    <h2>Features</h2>
    <ul>
        <li><strong>JWT Authentication</strong> with cookies</li>
        <li><strong>OAuth 2.0 Login</strong> via Google and GitHub with seamless account synchronization</li>
        <li><strong>Multi-Factor Authentication (MFA):</strong> Email OTP and TOTP via Microsoft and Google Authenticators</li>
        <li><strong>Dockerized Environment</strong> for easy setup and deployment</li>
        <li><strong>Kubernetes Integration</strong> with Skaffold for simplified local development and testing</li>
    </ul>

    <h2>Architecture</h2>
    <p>The application comprises three backend services and one frontend service:</p>
    <ul>
        <li><strong>login-server</strong>: Manages user authentication and JWT-based authorization.</li>
        <li><strong>oauth-server</strong>: Handles OAuth 2.0 login via Google and GitHub.</li>
        <li><strong>totp-server</strong>: Manages TOTP-based MFA.</li>
        <li><strong>login-client</strong>: React-based frontend for user interaction.</li>
    </ul>

    <h2>Tech Stack</h2>
    <ul>
        <li><strong>Frontend:</strong> React, JavaScript</li>
        <li><strong>Backend:</strong> Spring Boot, Java</li>
        <li><strong>Database:</strong> MySQL</li>
        <li><strong>Authentication:</strong> JWT, OAuth 2.0, MFA (OTP & TOTP)</li>
        <li><strong>Deployment:</strong> Docker, Kubernetes, Skaffold</li>
    </ul>

    <h2>Prerequisites</h2>
    <p>Ensure you have the following installed:</p>
    <ul>
        <li><strong>Docker</strong></li>
        <li><strong>Kubernetes</strong> (Minikube or a similar local cluster)</li>
        <li><strong>Skaffold</strong></li>
    </ul>

    <h2>Installation</h2>
    <p><strong>1. Clone the repository:</strong></p>
    <pre><code>git clone https://github.com/your-username/login-application.git
cd login-application
    </code></pre>

    <p><strong>2. Run the application with Skaffold:</strong></p>
    <pre><code>skaffold dev</code></pre>

    <p>This will deploy the entire stack on your local Kubernetes cluster.</p>

    <h2>Usage</h2>
    <p>Visit <code>http://localhost:&lt;specified-port&gt;</code> to access the login application.</p>

    <h2>Development Workflow</h2>
    <ul>
        <li><strong>Branching:</strong> Follow Git best practices with separate branches for each feature or fix.</li>
        <li><strong>Testing:</strong> Ensure code is thoroughly tested before merging.</li>
        <li><strong>Pull Requests:</strong> Submit PRs for review with concise commit messages and clear descriptions.</li>
    </ul>

    <h2>Contributing</h2>
    <p>Contributions are welcome! Please open an issue first to discuss any major changes.</p>

    <h2>License</h2>
    <p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for more details.</p>
</div>

<footer>
    <p>&copy; 2024 Your Name - View the project on <a href="https://github.com/your-username/login-application">GitHub</a></p>
</footer>

</body>
</html>
