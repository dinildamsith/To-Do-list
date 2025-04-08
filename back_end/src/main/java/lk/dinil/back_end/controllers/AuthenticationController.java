package lk.dinil.back_end.controllers;

import jakarta.validation.Valid;
import lk.dinil.back_end.dto.LoginDto;
import lk.dinil.back_end.dto.UserDto;
import lk.dinil.back_end.services.AuthenticationServices;
import lk.dinil.back_end.services.JwtServices;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class AuthenticationController {


    @Autowired
    AuthenticationServices authenticationServices;


    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestBody @Valid LoginDto loginDto){
      return authenticationServices.signIn(loginDto);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody @Valid UserDto userDto){
        return authenticationServices.signUp(userDto);
    }

}
