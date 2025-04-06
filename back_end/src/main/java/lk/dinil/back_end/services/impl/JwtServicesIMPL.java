package lk.dinil.back_end.services.impl;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lk.dinil.back_end.entity.UserEntity;
import lk.dinil.back_end.services.JwtServices;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtServicesIMPL implements JwtServices {

    final String secret = "jfkkdnskktrcmsllsjgmmskmmjjmdkjkjksnnmnfdjjsnnnnshjjmdnnncjdmdd";

    // Generate JWT token
    @Override
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new java.util.Date(System.currentTimeMillis()))
                .setExpiration(new java.util.Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    // Extract username from token
    @Override
    public String extractUserName(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }


    // Validate JWT token
    @Override
    public boolean isTokenValid(String token, String userName) {
        final String tokenHaveUserName = extractUserName(token);
        return (tokenHaveUserName.equals((userName)) && !isTokenExpired(token));
    }

    // Check if token is expired
    @Override
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extract expiration date from token
    private Date extractExpiration(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
    }

}
