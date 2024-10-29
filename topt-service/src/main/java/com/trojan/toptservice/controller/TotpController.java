package com.trojan.toptservice.controller;

import com.trojan.toptservice.dto.SecretResponse;
import com.trojan.toptservice.service.CookieService;
import com.trojan.toptservice.service.GAService;
import com.trojan.toptservice.service.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/totp")
public class TotpController {

    @Value("${app.redirect-url}")
    private String redirectUrl;

    @Autowired
    private GAService gaService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CookieService cookieService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam int code, @RequestParam String email, HttpServletResponse response) throws IOException {
        SecretResponse validationResponse = gaService.isValid(email, code);

        if (validationResponse != null) {
            String token = jwtService.generateToken(email, validationResponse.getId());
            Cookie jwtCookie = cookieService.createCookie("jwt_access", token, 86400); // 1 day in seconds

            response.addCookie(jwtCookie);
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid TOTP code");
        }
    }

    @GetMapping("/qr/generate")
    public ResponseEntity<String> generateQR(@RequestParam String email) {

        // first call the login service and get the secret key if already present.
        // else generate a new secret key

        String mfaSecret = gaService.generateKey();
        // Save this to login-service
        gaService.saveSecret(email, mfaSecret);
        BufferedImage qrImage = gaService.generateTotpQR(mfaSecret, email);
        if (qrImage != null) {
            try {
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                ImageIO.write(qrImage, "png", baos);
                String base64Image = Base64.getEncoder().encodeToString(baos.toByteArray());
                return ResponseEntity.ok(base64Image);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR).body("Error generating QR code");
            }
        }
        return ResponseEntity.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR).body("Error generating QR code");
    }
}
