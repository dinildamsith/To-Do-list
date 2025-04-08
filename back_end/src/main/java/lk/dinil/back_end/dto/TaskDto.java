package lk.dinil.back_end.dto;

import jakarta.validation.constraints.*;
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

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 100, message = "Title must be between 3 and 100 characters")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(min = 3, message = "Description must be at least 3 characters")
    private String description;

    @NotBlank(message = "Status is required")
    @Pattern(regexp = "^(DONE|IN_PROGRESS|TO_DO)$", message = "Status must be DONE, IN_PROGRESS, or TO_DO")
    private String status;

    private LocalDateTime createdAt;
}
