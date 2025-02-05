package timski.proekt.backend.Web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import timski.proekt.backend.Model.Review;
import timski.proekt.backend.Service.ReviewService;

import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewsController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public List<Review> allReviews(){
        return reviewService.listAll();
    }

    @GetMapping("/{id}")
    public Review getReviewById(@PathVariable Long id) {
        return reviewService.findById(id);
    }

    @GetMapping("/company/{id}")
    public List<Review> getReviewByCompanyId(@PathVariable long id){
        return reviewService.findAllByCompanyId(id);
    }

    @GetMapping("/user/{id}")
    public List<Review> getReviewByUserId(@PathVariable long id){
        return reviewService.findAllByUserId(id);
    }
}
