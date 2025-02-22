package JobHub.backend.Service.impl;

import JobHub.backend.Model.JobPost;
import JobHub.backend.Model.SavedJobPosts;
import JobHub.backend.Model.User;
import JobHub.backend.Repository.JobPostRepository;
import JobHub.backend.Repository.SavedJobPostsRepository;
import JobHub.backend.Repository.UserRepository;
import JobHub.backend.Service.SavedJobPostsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SavedJobPostsServiceImpl implements SavedJobPostsService {

    private final SavedJobPostsRepository savedJobPostsRepository;
    private final UserRepository userRepository;
    private final JobPostRepository jobPostRepository;

    public SavedJobPostsServiceImpl(SavedJobPostsRepository savedJobPostsRepository, UserRepository userRepository, JobPostRepository jobPostRepository) {
        this.savedJobPostsRepository = savedJobPostsRepository;
        this.userRepository = userRepository;
        this.jobPostRepository = jobPostRepository;
    }

    @Override
    public List<SavedJobPosts> getSavedJobPostsByUser(Long userId) {
        return savedJobPostsRepository.findAllByUserId(userId);
    }

    @Override
    public boolean saveJobPost(Long userId, Long jobPostId) {

        User user = userRepository.findById(userId).orElse(null);
        JobPost jobPost = jobPostRepository.findById(jobPostId).orElse(null);

        if (savedJobPostsRepository.findByUserIdAndJobPostId(userId, jobPostId).isPresent()) {
            return false;
        }

        if (user == null || jobPost == null) {
            return false;
        }

        savedJobPostsRepository.save(new SavedJobPosts(user, jobPost));
        return true;
    }

    @Override
    public void removeSavedJobPost(Long userId, Long jobPostId) {

    }
}
