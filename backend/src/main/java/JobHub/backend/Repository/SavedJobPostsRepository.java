package JobHub.backend.Repository;

import JobHub.backend.Model.SavedJobPosts;
import JobHub.backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SavedJobPostsRepository extends JpaRepository<SavedJobPosts, Long> {
    List<SavedJobPosts> findAllByUserId(Long id);

    Optional<SavedJobPosts> findByUserIdAndJobPostId(Long userId, Long jobPostId);

}
