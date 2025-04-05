package lk.dinil.back_end.dao;

import lk.dinil.back_end.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepo extends JpaRepository<TaskEntity,Long> {
}
