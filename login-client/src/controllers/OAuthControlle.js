
export const oAuthGoogleController = async () => {
    try {
        console.log("Initiating Google OAuth request...");
        // Directly change the window location to the OAuth2 authorization URL
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    } catch (error) {
        console.error("Google OAuth Error: ", error.message);
        console.error("Error details:", error.response);
        return {
            success: false,
            statusCode: error.response?.status || 500,
            message: error.response?.data?.message || 'Google OAuth error'
        };
    }
}

export const oAuthGithubController = async () => {
    try {
        console.log("Initiating GitHub OAuth request...");
        // Directly change the window location to the OAuth2 authorization URL
        window.location.href = 'http://localhost:8080/oauth2/authorization/github';
    } catch (error) {
        console.error("GitHub OAuth Error: ", error.message);
        console.error("Error details:", error.response);
        return {
            success: false,
            statusCode: error.response?.status || 500,
            message: error.response?.data?.message || 'GitHub OAuth error'
        };
    }
}