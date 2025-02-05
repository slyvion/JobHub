package timski.proekt.backend.Service.impl;

import org.springframework.stereotype.Service;
import timski.proekt.backend.Model.Company;
import timski.proekt.backend.Model.Dto.ReviewDto;
import timski.proekt.backend.Model.Review;
import timski.proekt.backend.Model.User;
import timski.proekt.backend.Repository.CompanyRepository;
import timski.proekt.backend.Repository.ReviewRepository;
import timski.proekt.backend.Repository.UserRepository;
import timski.proekt.backend.Service.ReviewService;
import timski.proekt.backend.exceptions.InvalidCompanyIdException;
import timski.proekt.backend.exceptions.InvalidReviewIdException;
import timski.proekt.backend.exceptions.InvalidUserIdException;

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

        return reviewRepository.save(review);
    }

    @Override
    public Review update(Long id, ReviewDto reviewDto) {
        Review review = this.findById(id);
        review.setTitle(reviewDto.getTitle());
        review.setRating(reviewDto.getRating());
        review.setComment(reviewDto.getComment());

        return reviewRepository.save(review);
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
