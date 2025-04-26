package JobHub.backend.Repository;

import JobHub.backend.Model.JobPost;
import JobHub.backend.Model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import JobHub.backend.Model.Company;
import JobHub.backend.Model.User;

import java.util.Date;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>, JpaSpecificationExecutor<Review> {

    List<Review> findAllById(long id);

    List<Review> findReviewsByPostDate(Date postDate);

    List<Review> findReviewsByCompanyCompanyName(String companyName);

    List<Review> findReviewsByCompanyId(long id);

    List<Review> findAllByUserId(long id);

    List<Review> findReviewsByRatingGreaterThan(Long rating);

}
