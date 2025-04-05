package lk.dinil.back_end.services.impl;

import lk.dinil.back_end.dao.TaskRepo;
import lk.dinil.back_end.dataConvert.Mapper;
import lk.dinil.back_end.dto.ResponseDto;
import lk.dinil.back_end.dto.TaskDto;
import lk.dinil.back_end.entity.TaskEntity;
import lk.dinil.back_end.services.TaskServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> createTask(TaskDto taskDto) {

        //---------set task id
        taskDto.setId(System.currentTimeMillis());

        if (taskDto.getId() != null && taskDto.getTitle() != null && taskDto.getDescription() != null) {
            TaskEntity save = taskRepo.save(mapper.convertToTaskDto(taskDto)); // save task

            ResponseDto responseDto = new ResponseDto();
            responseDto.setResponseCode("200");
            responseDto.setResponseMessage("Task Created Successfully");
            responseDto.setData(save);
            return ResponseEntity.ok(responseDto);
        } else {
            ResponseDto responseDto = new ResponseDto();
            responseDto.setResponseCode("400");
            responseDto.setResponseMessage("Task Creation Failed");
            return ResponseEntity.status(400).body(responseDto);

        }

    }

    @Override
    public ResponseEntity<?> updateTask(Long updateTaskId, TaskDto taskDto) {

        // Check if the task exists
        TaskEntity taskEntity = taskRepo.findById(updateTaskId).orElse(null);

        if (taskEntity == null) {
            ResponseDto responseDto = new ResponseDto();
            responseDto.setResponseCode("404");
            responseDto.setResponseMessage("Task Not Found");
            return ResponseEntity.status(404).body(responseDto);
        } else {

            if (taskDto.getTitle() != null && taskDto.getDescription() != null && taskDto.getStatus() != null) {
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
                return ResponseEntity.ok(responseDto);
            } else {
                ResponseDto responseDto = new ResponseDto();
                responseDto.setResponseCode("400");
                responseDto.setResponseMessage("Task Update Failed");
                return ResponseEntity.status(400).body(responseDto);
            }
        }

    }

    @Override
    public ResponseEntity<?> deleteTask(Long taskId) {

        // Check if the task exists
        TaskEntity taskEntity = taskRepo.findById(taskId).orElse(null);

        if (taskEntity != null) {
            // Delete the task
            taskRepo.delete(taskEntity);

            ResponseDto responseDto = new ResponseDto();
            responseDto.setResponseCode("200");
            responseDto.setResponseMessage("Task Deleted Successfully");
            return ResponseEntity.ok(responseDto);
        } else {
            ResponseDto responseDto = new ResponseDto();
            responseDto.setResponseCode("404");
            responseDto.setResponseMessage("Task Not Found");
            return ResponseEntity.status(404).body(responseDto);
        }

    }

    @Override
    public ResponseEntity<?> getTaskById(Long taskId) {

        // Check if the task exists
        TaskEntity taskEntity = taskRepo.findById(taskId).orElse(null);

        if (taskEntity != null) {
            ResponseDto responseDto = new ResponseDto();
            responseDto.setResponseCode("200");
            responseDto.setResponseMessage("Task Found");
            responseDto.setData(taskEntity);
            return ResponseEntity.ok(responseDto);
        } else {
            ResponseDto responseDto = new ResponseDto();
            responseDto.setResponseCode("404");
            responseDto.setResponseMessage("Task Not Found");
            return ResponseEntity.status(404).body(responseDto);
        }
    }

    @Override
    public ResponseEntity<?> getAllTasksUserBy(Long userId) {

        // Check if the user exists
        List<TaskEntity> taskEntities = taskRepo.findByUserId(userId);

        if (taskEntities != null && !taskEntities.isEmpty()) {
            ResponseDto responseDto = new ResponseDto();
            responseDto.setResponseCode("200");
            responseDto.setResponseMessage("Tasks Found");
            responseDto.setData(taskEntities);
            return ResponseEntity.ok(responseDto);
        } else {
            ResponseDto responseDto = new ResponseDto();
            responseDto.setResponseCode("404");
            responseDto.setResponseMessage("No Tasks Found for this User");
            return ResponseEntity.status(404).body(responseDto);
        }

    }
}
