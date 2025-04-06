package lk.dinil.back_end.services.impl;

import lk.dinil.back_end.dao.UserRepo;
import lk.dinil.back_end.dataConvert.Mapper;
import lk.dinil.back_end.dto.LoginDto;
import lk.dinil.back_end.dto.ResponseDto;
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
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceIMPL implements AuthenticationServices {


    private final AuthenticationManager authenticationManager;

    @Autowired
    JwtServices jwtServices;

    @Autowired
    UserRepo userRepo;

    @Autowired
    Mapper mapper;

    @Override
    public ResponseEntity<?> signIn(LoginDto loginDto) {
        System.out.println(loginDto);
        UserDetails userDetails = userRepo.findByUsername(loginDto.getUsername());


        if (loginDto.getUsername().equals(userDetails.getUsername()) && loginDto.getPassword().equals(userDetails.getPassword())) {
            ResponseDto responseDto = new ResponseDto();
            responseDto.setResponseCode("200");
            responseDto.setResponseMessage("Login Successful");
            responseDto.setData(jwtServices.generateToken(loginDto.getUsername()));
            return ResponseEntity.ok(responseDto);
        } else {
            ResponseDto responseDto = new ResponseDto();
            responseDto.setResponseCode("401");
            responseDto.setResponseMessage("Invalid username or password");
            return ResponseEntity.status(401).body(responseDto);
        }
    }

    @Override
    public ResponseEntity<?> signUp(UserDto userDto) {
        userDto.setId(System.currentTimeMillis());
        userRepo.save(mapper.convertToUserEntity(userDto));
        ResponseDto responseDto = new ResponseDto();
        responseDto.setResponseCode("200");
        responseDto.setResponseMessage("User Created Successfully");
        return ResponseEntity.ok(responseDto);
    }
}
