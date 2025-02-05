package timski.proekt.backend.Web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import timski.proekt.backend.Model.Company;
import timski.proekt.backend.Model.Constants.EmploymentType;
import timski.proekt.backend.Model.Constants.JobType;
import timski.proekt.backend.Model.Dto.JobPostDto;
import timski.proekt.backend.Model.JobPost;
import timski.proekt.backend.Service.CompanyService;
import timski.proekt.backend.Service.JobPostService;

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
            @RequestParam(required = false) Company company,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) JobType jobType,
            @RequestParam(required = false) EmploymentType employmentType) {

        if( title == null &&
            company == null &&
            location == null &&
            jobType == null &&
            employmentType == null){
            return jobPostService.listAll();
        }
        return jobPostService.jobPostFilter(
                title, company, location, jobType, employmentType);
    }

    @PostMapping
    public JobPost create(@Valid @RequestBody JobPostDto jobPostDto) {
        return jobPostService.create(
                jobPostDto
        );
    }

    @PutMapping("/{id}/edit")
    public JobPost update(@PathVariable Long id,
                          @Valid  @RequestBody JobPostDto jobPostDto) {


        return jobPostService.update(
                id,
                jobPostDto
        );
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
