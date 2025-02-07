package timski.proekt.backend.Service;

import timski.proekt.backend.Model.Company;
import timski.proekt.backend.Model.Dto.ReviewDto;
import timski.proekt.backend.Model.JobPost;
import timski.proekt.backend.Model.Review;
import timski.proekt.backend.Model.User;

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
