package lk.dinil.back_end.services;

import lk.dinil.back_end.dto.ResponseDto;
import lk.dinil.back_end.dto.TaskDto;

import java.util.List;

public interface TaskServices {
    ResponseDto createTask(TaskDto taskDto);
    ResponseDto updateTask(TaskDto taskDto);
    ResponseDto deleteTask(String taskId);
    ResponseDto getTaskById(String taskId);
    List<ResponseDto> getAllTasks();

}
