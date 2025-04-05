package lk.dinil.back_end.services.impl;

import lk.dinil.back_end.dao.TaskRepo;
import lk.dinil.back_end.dataConvert.Mapper;
import lk.dinil.back_end.dto.ResponseDto;
import lk.dinil.back_end.dto.TaskDto;
import lk.dinil.back_end.entity.TaskEntity;
import lk.dinil.back_end.services.TaskServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class TaskServicesIMPL implements TaskServices {

    @Autowired
    TaskRepo taskRepo;

    @Autowired
    Mapper mapper;

    @Override
    public ResponseDto createTask(TaskDto taskDto) {

        //---------set task id
        taskDto.setId(System.currentTimeMillis());

        if (taskDto.getId() != null && taskDto.getTitle() != null && taskDto.getDescription() != null) {
            TaskEntity save = taskRepo.save(mapper.convertToTaskDto(taskDto)); // save task

            ResponseDto responseDto = new ResponseDto();
            responseDto.setResponseCode("200");
            responseDto.setResponseMessage("Task Created Successfully");
            responseDto.setData(save);
            return responseDto;
        } else {
            ResponseDto responseDto = new ResponseDto();
            responseDto.setResponseCode("400");
            responseDto.setResponseMessage("Task Creation Failed");
            return responseDto;

        }

    }

    @Override
    public ResponseDto updateTask(Long updateTaskId, TaskDto taskDto) {

        // Check if the task exists
        TaskEntity taskEntity = taskRepo.findById(updateTaskId).orElseThrow(() -> new RuntimeException("Task not found"));

        if (taskEntity.getTitle() != null && taskEntity.getDescription() != null && taskEntity.getStatus() != null) {
            // Update the task entity with new values
            taskEntity.setTitle(taskDto.getTitle());
            taskEntity.setDescription(taskDto.getDescription());
            taskEntity.setStatus(taskDto.getStatus());

            // Save the updated task
            TaskEntity updatedTask = taskRepo.save(taskEntity);

            ResponseDto responseDto = new ResponseDto();
            responseDto.setResponseCode("200");
            responseDto.setResponseMessage("Task Update Successfully");
            responseDto.setData(updatedTask);
            return responseDto;
        } else {
            ResponseDto responseDto = new ResponseDto();
            responseDto.setResponseCode("400");
            responseDto.setResponseMessage("Task Update Failed");
            return responseDto;
        }

    }

    @Override
    public ResponseDto deleteTask(String taskId) {
        return null;
    }

    @Override
    public ResponseDto getTaskById(String taskId) {
        return null;
    }

    @Override
    public List<ResponseDto> getAllTasks() {
        return List.of();
    }
}
