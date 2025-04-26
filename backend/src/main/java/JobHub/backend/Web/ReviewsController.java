package JobHub.backend.Web;

import JobHub.backend.Model.Constants.UserRole;
import JobHub.backend.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import JobHub.backend.Model.Review;
import JobHub.backend.Service.ReviewService;

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

    @GetMapping("/admin")
    public List<Review> userAdminFilter(
            @RequestParam(required = false) String companyName,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Double rating
    ){
        if ( companyName == null &&
                title == null &&
                rating == null){
            return reviewService.listAll();
        }
        return reviewService.reviewFilter(companyName, title, rating);

    }
}
