package JobHub.backend.Web;

import JobHub.backend.Service.CompanyService;
import JobHub.backend.Service.JobPostService;
import JobHub.backend.Service.ReviewService;
import JobHub.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/misc")
public class MiscController {

    @Autowired
    private CompanyService companyService;

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private JobPostService jobPostService;

    @Autowired
    private UserService userService;

    @GetMapping("/counts")
    public Map<String, Integer> getAllCounts() {
        Map<String, Integer> counts = new HashMap<>();
        counts.put("userCount", userService.usersCount());
        counts.put("reviewCount", reviewService.reviewsCount());
        counts.put("companyCount", companyService.companiesCount());
        counts.put("jobPostCount", jobPostService.jobpostsCount());
        return counts;
    }

}
