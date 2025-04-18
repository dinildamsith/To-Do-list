package lk.dinil.back_end.controllers;

import jakarta.validation.Valid;
import lk.dinil.back_end.dto.ResponseDto;
import lk.dinil.back_end.dto.TaskDto;
import lk.dinil.back_end.services.TaskServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/task")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TaskController {

    @Autowired
    private TaskServices taskServices;

    // add task
    @PostMapping("/add")
    public ResponseEntity<?> addTask(@RequestBody @Valid TaskDto taskDto) {
        return taskServices.createTask(taskDto);
    }

    // update task
    @PutMapping("/update/{taskId}")
    public ResponseEntity<?> updateTask(@PathVariable @Valid Long taskId, @RequestBody TaskDto taskDto) {
        return taskServices.updateTask(taskId, taskDto);
    }

    // get task by id
    @GetMapping("/get/{taskId}")
    public ResponseEntity<?> getTaskById(@PathVariable Long taskId) {
        return taskServices.getTaskById(taskId);
    }

    // delete task
    @DeleteMapping("/delete/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Long taskId) {
        return taskServices.deleteTask(taskId);
    }


    // get all tasks by user id
    @GetMapping("/getAll/{userId}")
    public ResponseEntity<?> getAllTasksUserBy(@PathVariable Long userId) {
        return taskServices.getAllTasksUserBy(userId);
    }
}
