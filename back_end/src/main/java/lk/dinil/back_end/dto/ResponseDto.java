package lk.dinil.back_end.dto;

import lombok.Data;

@Data
public class ResponseDto {
    private String responseCode;
    private String responseMessage;
    private Object data;
}
