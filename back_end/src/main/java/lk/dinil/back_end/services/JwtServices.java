package lk.dinil.back_end.services;

import lk.dinil.back_end.entity.UserEntity;
import org.springframework.security.core.userdetails.UserDetails;

public interface JwtServices {
    String generateToken(String username);
    String extractUserName(String token);
    boolean isTokenValid(String token, String userName);
    boolean isTokenExpired(String token);
}
