package lk.dinil.back_end.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name= "task")
public class TaskEntity {
    @Id
    private Long id;
    private String title;
    private String description;
    private String status;
    private LocalDateTime createdAt;
}
