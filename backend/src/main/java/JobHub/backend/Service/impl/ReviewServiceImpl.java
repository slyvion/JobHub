package JobHub.backend.Service.impl;

import JobHub.backend.exceptions.InvalidUserIdException;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
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
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
    public Integer reviewsCount() {
        return reviewRepository.countAllDistinctReviews();
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
                reviewDto.getPros(),
                reviewDto.getCons()
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
        review.setPros(reviewDto.getPros());
        review.setCons(reviewDto.getCons());
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
    public List<Review> findAllById(Long id) {
        return reviewRepository.findAllById(id);
    }

    @Override
    public List<Review> listAll() {
        return reviewRepository.findAll();
    }

    @Transactional(readOnly = true)
    @Override
    public List<Review> findAllByCompanyId(long id) {
        return reviewRepository.findReviewsByCompanyId(id);
    }

    @Override
    public List<Review> findByDate(Date postDate) {
        return reviewRepository.findReviewsByPostDate(postDate);
    }

    @Override
    public List<Review> findByCompanyName(String companyName) {
        return reviewRepository.findReviewsByCompanyCompanyName(companyName);
    }

    @Transactional(readOnly = true)
    @Override
    public List<Review> findAllByUserId(Long id) {
        return reviewRepository.findAllByUserId(id);
    }

    @Override
    public List<Review> findByRatingGreaterThan(long rating) {
        return reviewRepository.findReviewsByRatingGreaterThan(rating);
    }

    @Override
    public List<Review> reviewFilter(String companyName, String title,Double rating){
        return reviewRepository.findAll((Specification<Review>) (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (companyName != null) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("company").get("companyName")), "%" + companyName.toLowerCase() + "%"));
            }
            if (title != null) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + title.toLowerCase() + "%"));
            }

            if (rating != null) {
                switch (rating.intValue()) {
                    case 1:
                        predicates.add(criteriaBuilder.and(
                                criteriaBuilder.greaterThanOrEqualTo(root.get("rating"), 1.0),
                                criteriaBuilder.lessThan(root.get("rating"), 2.0)
                        ));
                        break;
                    case 2:
                        predicates.add(criteriaBuilder.and(
                                criteriaBuilder.greaterThanOrEqualTo(root.get("rating"), 2.0),
                                criteriaBuilder.lessThan(root.get("rating"), 3.0)
                        ));
                        break;
                    case 3:
                        predicates.add(criteriaBuilder.and(
                                criteriaBuilder.greaterThanOrEqualTo(root.get("rating"), 3.0),
                                criteriaBuilder.lessThan(root.get("rating"), 4.0)
                        ));
                        break;
                    case 4:
                        predicates.add(criteriaBuilder.and(
                                criteriaBuilder.greaterThanOrEqualTo(root.get("rating"), 4.0),
                                criteriaBuilder.lessThanOrEqualTo(root.get("rating"), 5.0)
                        ));
                        break;
                }
            }


            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

}
