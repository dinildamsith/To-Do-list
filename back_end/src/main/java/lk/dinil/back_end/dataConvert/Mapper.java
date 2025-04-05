package lk.dinil.back_end.dataConvert;

import lk.dinil.back_end.dto.UserDto;
import lk.dinil.back_end.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class Mapper {

    private final ModelMapper mapper;


    //---- USER DTO CONVERT USER ENTITY
    public UserEntity convertToUserEntity(UserDto userDto) {
        return mapper.map(userDto, UserEntity.class);
    }

    //---- USER Entity CONVERT USER DTO
    public UserDto convertToUserDto(UserEntity userEntity) {
        return mapper.map(userEntity, UserDto.class);
    }

}
