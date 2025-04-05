package lk.dinil.back_end.controllers;

import lk.dinil.back_end.dto.ResponseDto;
import lk.dinil.back_end.dto.TaskDto;
import lk.dinil.back_end.services.TaskServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/task")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskServices taskServices;

    // add task
    @PostMapping("/add")
    public ResponseEntity<?> addTask(@RequestBody TaskDto taskDto) {
        return taskServices.createTask(taskDto);
    }

    // update task
    @PutMapping("/update/{taskId}")
    public ResponseEntity<?> updateTask(@PathVariable Long taskId, @RequestBody TaskDto taskDto) {
        return taskServices.updateTask(taskId, taskDto);
    }

    @GetMapping("/get/{taskId}")
    public ResponseEntity<?> getTaskById(@PathVariable Long taskId) {
        return taskServices.getTaskById(taskId);
    }

    @DeleteMapping("/delete/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Long taskId) {
        return taskServices.deleteTask(taskId);
    }

    @GetMapping("/getAll/{userId}")
    public ResponseEntity<?> getAllTasksUserBy(@PathVariable Long userId) {
        return taskServices.getAllTasksUserBy(userId);
    }
}
