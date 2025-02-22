package JobHub.backend.Service;

import JobHub.backend.Model.SavedJobPosts;

import java.util.List;

public interface SavedJobPostsService {

    List<SavedJobPosts> getSavedJobPostsByUser(Long userId);

    boolean saveJobPost(Long userId, Long jobPostId);

    void removeSavedJobPost(Long userId, Long jobPostId);
}
