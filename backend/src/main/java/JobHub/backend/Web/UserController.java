package JobHub.backend.Web;

import JobHub.backend.Model.*;
import JobHub.backend.Model.Constants.EmployeeNumber;
import JobHub.backend.Model.Constants.UserRole;
import JobHub.backend.Service.ReviewService;
import JobHub.backend.Service.SavedJobPostsService;
import JobHub.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import JobHub.backend.Model.Dto.User.UserEmailUpdateDto;
import JobHub.backend.Model.Dto.User.UserPasswordUpdateDto;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ReviewService reviewService;
    @Autowired
    private SavedJobPostsService savedJobPostsService;


    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @GetMapping("/{id}/reviews")
    public List<Review> getReviewByUserId(@PathVariable Long id){
        return reviewService.findAllByUserId(id);
    }


    @PutMapping("/{id}/passwordUpdate")
    public User updatePassword(@PathVariable Long id,
                               @Valid @RequestBody UserPasswordUpdateDto userDto) {
        return userService.PasswordUpdate(id, userDto);
    }
    @PutMapping("/{id}/emailUpdate")
    public User updateEmail(@PathVariable long id,
                            @Valid @RequestBody UserEmailUpdateDto userDto){
        return userService.EmailUpdate(id, userDto);
    }
    @GetMapping("/{id}/savedJobPosts")
    public List<SavedJobPosts> getSavedJobPosts(@PathVariable Long id) {
        return savedJobPostsService.getSavedJobPostsByUser(id);
    }
    @GetMapping("/{id}/appliedJobs")
    public List<Apply> getAppliedJobs(@PathVariable Long id){
        return userService.findAllAppliesByUserId(id);
    }


    @PostMapping("/{id}/saveJob/{jobPostId}")
    public String saveJobPost(@PathVariable Long id,
                              @PathVariable Long jobPostId) {
        boolean success = savedJobPostsService.saveJobPost(id, jobPostId);
        return success ? "Job post saved" : "Job post already saved or does not exist";
    }

    @DeleteMapping("/{id}/removeJob/{jobPostId}")
    public String removeSavedJobPost(@PathVariable Long id,
                                     @PathVariable Long jobPostId) {
        savedJobPostsService.removeSavedJobPost(id, jobPostId);
        return "Job post removed";
    }


    @GetMapping("/admin")
        public List<User> userAdminFilter(
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) UserRole role
    ){
        if ( username == null &&
                email == null &&
                role == null){
            return userService.listAll();
        }
        return userService.userFilter(username, email, role);

    }

}
