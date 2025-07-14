package JobHub.backend.Service;

import JobHub.backend.Model.Review;
import JobHub.backend.Model.Company;
import JobHub.backend.Model.Dto.ReviewDto;

import java.util.Date;
import java.util.List;

public interface ReviewService {

    Integer reviewsCount();


    Review create(ReviewDto reviewDto);

    Review update(Long id, ReviewDto reviewDto);

    Review findById(Long id);
    Review deleteReview(Long id);

    List<Review> findAllById(Long id);

    List<Review> listAll();

    List<Review> findAllByCompanyId(long id);

    List<Review> findByDate(Date postDate);

    List<Review> findByCompanyName(String companyName);

    List<Review> findAllByUserId(Long id);
    List<Review> findByRatingGreaterThan(long rating);

    List<Review> reviewFilter(String companyName, String title, Double rating);
}
