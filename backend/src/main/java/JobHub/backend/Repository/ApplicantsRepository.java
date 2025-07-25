package JobHub.backend.Repository;

import JobHub.backend.Model.Apply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicantsRepository extends JpaRepository<Apply, Long> {

    List<Apply> findAllByJobPostId(Long id);

    List<Apply> findAllByUserId(Long id);

    List<Apply> deleteByUserId(Long id);
}
