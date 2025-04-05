package lk.dinil.back_end.services.impl;

import lk.dinil.back_end.dao.UserRepo;
import lk.dinil.back_end.dataConvert.Mapper;
import lk.dinil.back_end.dto.LoginDto;
import lk.dinil.back_end.dto.UserDto;
import lk.dinil.back_end.services.AuthenticationServices;
import lk.dinil.back_end.services.JwtServices;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    public String signIn(LoginDto loginDto) {
        System.out.println(loginDto);
        UserDetails userDetails = userRepo.findByUsername(loginDto.getUsername());


        if (loginDto.getUsername().equals(userDetails.getUsername()) && loginDto.getPassword().equals(userDetails.getPassword())) {
            return jwtServices.generateToken(loginDto.getUsername());
        } else {
            return "Authentication failed";
        }
    }

    @Override
    public String signUp(UserDto userDto) {
        userRepo.save(mapper.convertToUserEntity(userDto));
        return "User Register Success";
    }
}
