package com.trojan.toptservice.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.trojan.toptservice.dto.SecretResponse;
import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorConfig;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import com.warrenstrange.googleauth.GoogleAuthenticatorQRGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URI;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class GAService {

    @Autowired
    private RestTemplate restTemplate;

    private static final String ISSUER = "Troj-Auth";
    private static final String LOGIN_SERVER_URL = "http://localhost:8080/api/auth/saveSecret";

    // Generate a new TOTP key
    public String generateKey() {
        GoogleAuthenticator gAuth = new GoogleAuthenticator();
        final GoogleAuthenticatorKey key = gAuth.createCredentials();
        return key.getKey();
    }

    // Validate the TOTP code
    public SecretResponse isValid(String email, int code) {
        SecretResponse secretResponse = getSecretFromLoginServer(email);
        if (secretResponse == null) {
            return null;
        }

        GoogleAuthenticator gAuth = new GoogleAuthenticator(
                new GoogleAuthenticatorConfig.GoogleAuthenticatorConfigBuilder().build()
        );
        boolean isValid = gAuth.authorize(secretResponse.getSecret(), code);
        return isValid ? secretResponse : null;
    }

    public SecretResponse getSecretFromLoginServer(String email) {
        URI uri = UriComponentsBuilder.fromHttpUrl("http://localhost:8080/api/auth/get/secret")
                .queryParam("email", email)
                .build()
                .toUri();

        try {
            ResponseEntity<SecretResponse> response = restTemplate.getForEntity(uri, SecretResponse.class);
            return response.getBody();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Generate a QR code URL for Google Authenticator
    public String generateQRUrl(String secret, String username) {
        String url = GoogleAuthenticatorQRGenerator.getOtpAuthTotpURL(
                ISSUER,
                username,
                new GoogleAuthenticatorKey.Builder(secret).build());
        try {
            return generateQRBase64(url);
        } catch (Exception e) {
            return null;
        }
    }

    // Generate a QR code image in Base64 format
    private static String generateQRBase64(String qrCodeText) {
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            Map<EncodeHintType, Object> hintMap = new HashMap<>();
            hintMap.put(EncodeHintType.CHARACTER_SET, "UTF-8");

            BitMatrix bitMatrix = qrCodeWriter.encode(qrCodeText, BarcodeFormat.QR_CODE, 200, 200, hintMap);
            BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(bufferedImage, "png", baos);
            byte[] imageBytes = baos.toByteArray();
            return Base64.getEncoder().encodeToString(imageBytes);
        } catch (WriterException | IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private BufferedImage generateQRImage(String secret, String username) {
        String url = GoogleAuthenticatorQRGenerator.getOtpAuthTotpURL(
                ISSUER,
                username,
                new GoogleAuthenticatorKey.Builder(secret).build());
        return generateQRImage(url);
    }

    public BufferedImage generateTotpQR(String mfaSecret,String email) {
        return generateQRImage(mfaSecret, email);
    }

    public static BufferedImage generateQRImage(String qrCodeText) {
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            Map<EncodeHintType, Object> hintMap = new HashMap<>();
            hintMap.put(EncodeHintType.CHARACTER_SET, "UTF-8");

            BitMatrix bitMatrix = qrCodeWriter.encode(qrCodeText, BarcodeFormat.QR_CODE, 200, 200, hintMap);
            return MatrixToImageWriter.toBufferedImage(bitMatrix);

        } catch (WriterException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void saveSecret(String email, String mfaSecret) {
        URI uri = UriComponentsBuilder.fromHttpUrl(LOGIN_SERVER_URL)
                .queryParam("email", email)
                .queryParam("secret", mfaSecret)
                .build()
                .toUri();

        try {
            restTemplate.postForEntity(uri, null, String.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}