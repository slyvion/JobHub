package JobHub.backend.Service.impl;

import JobHub.backend.exceptions.InvalidUserIdException;
import org.springframework.stereotype.Service;
import JobHub.backend.Model.Company;
import JobHub.backend.Model.Dto.ReviewDto;
import JobHub.backend.Model.Review;
import JobHub.backend.Model.User;
import JobHub.backend.Repository.CompanyRepository;
import JobHub.backend.Repository.ReviewRepository;
import JobHub.backend.Repository.UserRepository;
import JobHub.backend.Service.ReviewService;
import JobHub.backend.exceptions.InvalidCompanyIdException;
import JobHub.backend.exceptions.InvalidReviewIdException;

import java.util.Date;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository, UserRepository userRepository, CompanyRepository companyRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
    }

    @Override
    public Review create(ReviewDto reviewDto) {
        User user = userRepository.findById(reviewDto.getUserId()).orElseThrow(InvalidUserIdException::new);
        Company company = companyRepository.findById(reviewDto.getCompanyId()).orElseThrow(InvalidCompanyIdException::new);
        Review review = new Review(
                reviewDto.getTitle(),
                user,
                company,
                reviewDto.getRating(),
                reviewDto.getComment()
        );

        Review savedReview = reviewRepository.save(review);
        company.getReviews().add(savedReview);
        company.updateRating();
        companyRepository.save(company);

        return savedReview;
    }

    @Override
    public Review update(Long id, ReviewDto reviewDto) {
        Review review = this.findById(id);
        review.setTitle(reviewDto.getTitle());
        review.setRating(reviewDto.getRating());
        review.setComment(reviewDto.getComment());
        return reviewRepository.save(review);
    }

    public Review deleteReview(Long id) {
        Review review = reviewRepository.findById(id).orElseThrow(InvalidReviewIdException::new);

        Company company = review.getCompany();
        company.getReviews().remove(review);
        company.updateRating();

        companyRepository.save(company);
        reviewRepository.delete(review);

        return review;
    }

    @Override
    public Review findById(Long id) {
        return reviewRepository.findById(id).orElseThrow(InvalidReviewIdException::new);
    }

    @Override
    public List<Review> findAllById(long id) {
        return reviewRepository.findAllById(id);
    }

    @Override
    public List<Review> listAll() {
        return reviewRepository.findAll();
    }

    @Override
    public List<Review> findAllByCompanyId(long id) {
        return reviewRepository.findReviewsByCompanyId(id);
    }

    @Override
    public List<Review> findByDate(Date postDate) {
        return reviewRepository.findReviewsByPostDate(postDate);
    }

    @Override
    public List<Review> findByCompany(Company company) {
        return reviewRepository.findReviewsByCompany(company);
    }

    @Override
    public List<Review> findAllByUserId(long id) {
        return reviewRepository.findAllByUserId(id);
    }

    @Override
    public List<Review> findByRatingGreaterThan(long rating) {
        return reviewRepository.findReviewsByRatingGreaterThan(rating);
    }
}
