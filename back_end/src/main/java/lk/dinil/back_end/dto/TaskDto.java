package lk.dinil.back_end.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto {
    private Long id;
    private Long userId;
    private String title;
    private String description;
    private String status;
    private LocalDateTime createdAt;
}
