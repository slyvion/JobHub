package JobHub.backend.Service;

import JobHub.backend.Model.Review;
import JobHub.backend.Model.Company;
import JobHub.backend.Model.Dto.ReviewDto;

import java.util.Date;
import java.util.List;

public interface ReviewService {


    Review create(ReviewDto reviewDto);

    Review update(Long id, ReviewDto reviewDto);

    Review findById(Long id);
    Review deleteReview(Long id);

    List<Review> findAllById(long id);

    List<Review> listAll();

    List<Review> findAllByCompanyId(long id);

    List<Review> findByDate(Date postDate);

    List<Review> findByCompany(Company company);

    List<Review> findAllByUserId(long id);
    List<Review> findByRatingGreaterThan(long rating);
}
