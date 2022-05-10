package com.example.reactspringbootboardtutorial.authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class JwtProvider {
    private final Long TOKEN_VALID_DURATION = 1000L * 60 * 30; // 30 minutes in milliseconds
    private final byte[] rawSecret = "SLtA5q@r3Sf!CwYtPP@CTX$i3x4%qF$OWifMniJ$h5GL97Z0*i07QwZeV&M!lDZ^".getBytes(StandardCharsets.UTF_8);
    private final SecretKey secret = Keys.hmacShaKeyFor(rawSecret);

    public String generateToken(UserDetails userDetails) {
        Date now = new Date();
        Claims claims = Jwts.claims().setSubject(userDetails.getUsername());
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        claims.put("roles", roles);

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setClaims(claims)
                .setExpiration(new Date(now.getTime() + TOKEN_VALID_DURATION))
                .signWith(secret)
                .compact();
    }

    public boolean isValid(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(secret).build().parseClaimsJws(token);
        } catch (NullPointerException | JwtException e) {
            return false;
        }
        return true;
    }

    public String getSubject(String token) {
        String subject;

        try {
            subject = Jwts.parserBuilder().setSigningKey(secret).build().parseClaimsJws(token).getBody().getSubject();
        } catch (NullPointerException | JwtException e) {
            throw new SecurityException("JWT Token is invalid.");
        }

        return subject;
    }
}
