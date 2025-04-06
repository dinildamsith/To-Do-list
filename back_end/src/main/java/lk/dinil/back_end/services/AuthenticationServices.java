package lk.dinil.back_end.services;

import lk.dinil.back_end.dto.LoginDto;
import lk.dinil.back_end.dto.UserDto;
import org.springframework.http.ResponseEntity;

public interface AuthenticationServices {
    ResponseEntity<?> signIn(LoginDto loginDto);
    ResponseEntity<?> signUp(UserDto userDto);
}
