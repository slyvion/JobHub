package JobHub.backend.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "saved_job_posts")
public class SavedJobPosts {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "jobpost_id", nullable = false)
    private JobPost jobPost;

    public SavedJobPosts(User user, JobPost jobPost) {
        this.user = user;
        this.jobPost = jobPost;
    }
}
