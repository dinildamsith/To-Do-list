package lk.dinil.back_end.services;

import lk.dinil.back_end.dto.LoginDto;
import lk.dinil.back_end.dto.UserDto;

public interface AuthenticationServices {
    String signIn(LoginDto loginDto);
    String signUp(UserDto userDto);
}
