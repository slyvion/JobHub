package JobHub.backend.Web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import JobHub.backend.Model.Company;
import JobHub.backend.Model.Constants.EmploymentType;
import JobHub.backend.Model.Constants.JobType;
import JobHub.backend.Model.Dto.JobPostDto;
import JobHub.backend.Model.JobPost;
import JobHub.backend.Service.JobPostService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/jobposts")
public class JobPostController {

    @Autowired
    private JobPostService jobPostService;

    @GetMapping("/{id}")
    public JobPost getJobPostById(@PathVariable Long id) {
        return jobPostService.findById(id);
    }


    @GetMapping
    public List<JobPost> jobPostsFilter(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String companyName,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) JobType jobType,
            @RequestParam(required = false) EmploymentType employmentType) {

        if( title == null &&
            companyName == null &&
            location == null &&
            jobType == null &&
            employmentType == null){
            return jobPostService.listAll();
        }
        return jobPostService.jobPostFilter(
                title, companyName, location, jobType, employmentType);
    }

    @PostMapping
    public JobPost create(@Valid @RequestBody JobPostDto jobPostDto) {
        return jobPostService.create(jobPostDto);
    }

    @PutMapping("/{id}/edit")
    public JobPost update(@PathVariable Long id,
                          @Valid  @RequestBody JobPostDto jobPostDto) {


        return jobPostService.update(id, jobPostDto);
    }

    @PostMapping("/{id}/delete")
    public String delete(@PathVariable Long id) {
        jobPostService.delete(id);
        return "redirect:/jobposts";
    }
    @GetMapping("/company/{id}")
    public List<JobPost> getJobPostByCompanyId(@PathVariable Long id) {
        return jobPostService.findJobPostsByCompanyId(id);
    }

}
