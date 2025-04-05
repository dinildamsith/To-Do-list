package lk.dinil.back_end.controllers;

import lk.dinil.back_end.dto.ResponseDto;
import lk.dinil.back_end.dto.TaskDto;
import lk.dinil.back_end.services.TaskServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/task")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskServices taskServices;

    // add task
    @PostMapping("/add")
    public ResponseDto addTask(@RequestBody TaskDto taskDto) {
        return taskServices.createTask(taskDto);
    }
}
