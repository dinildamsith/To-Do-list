package lk.dinil.back_end.services;

import lk.dinil.back_end.dto.ResponseDto;
import lk.dinil.back_end.dto.TaskDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TaskServices {
    ResponseEntity<?> createTask(TaskDto taskDto);
    ResponseEntity<?> updateTask(Long updateTaskId, TaskDto taskDto);
    ResponseEntity<?> deleteTask(Long taskId);
    ResponseEntity<?> getTaskById(Long taskId);
    ResponseEntity<?> getAllTasksUserBy(Long userId);

}
