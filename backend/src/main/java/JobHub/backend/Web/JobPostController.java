package JobHub.backend.Web;

import JobHub.backend.Model.Apply;
import JobHub.backend.Model.Constants.Seniority;
import JobHub.backend.Model.Constants.Tags;
import JobHub.backend.Model.Dto.JobPostSearchDto;
import JobHub.backend.Model.Dto.User.ApplyDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import JobHub.backend.Model.Company;
import JobHub.backend.Model.Constants.EmploymentType;
import JobHub.backend.Model.Constants.JobType;
import JobHub.backend.Model.Dto.JobPostDto;
import JobHub.backend.Model.JobPost;
import JobHub.backend.Service.JobPostService;
import org.springframework.web.multipart.MultipartFile;

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


    @PostMapping("/search")
    public Page<JobPost> jobPostsFilter(
            @RequestBody JobPostSearchDto searchDto,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return jobPostService.jobPostFilter(searchDto, pageable);
    }


    @PostMapping("/create")
    public JobPost create(@Valid @RequestBody JobPostDto jobPostDto) {
        return jobPostService.create(jobPostDto);
    }

    @PutMapping("/{id}/edit")
    public JobPost update(@PathVariable Long id,
                          @Valid @RequestBody JobPostDto jobPostDto) {


        return jobPostService.update(id, jobPostDto);
    }

    @DeleteMapping("/{id}/delete")
    public String delete(@PathVariable Long id) {
        jobPostService.delete(id);
        return "redirect:/jobposts";
    }

    @GetMapping("/company/{id}")
    public List<JobPost> getJobPostByCompanyId(@PathVariable Long id) {
        return jobPostService.findJobPostsByCompanyId(id);
    }

    @PutMapping("/{id}/apply")
    public ResponseEntity<Apply> applyToJob(
            @PathVariable Long id,
            @RequestPart("applyDto") ApplyDto applyDto,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        applyDto.setAttachment(file);

        Apply savedApplication = jobPostService.apply(id, applyDto);
        return ResponseEntity.ok(savedApplication);
    }

    @GetMapping("/{id}/applicants")
    public List<Apply> getApplicantsByJobpostId(@PathVariable Long id) {
        return jobPostService.findApplicantsByJobpostId(id);
    }

    //@PostMapping("/jobposts/{id}/applicants/updateStatus")
    // public Apply updateStatus(@PathVariable Long Id,
    //                           Status status,
    //                           Long applicantId){
    // return jobPostService.updateStatus(jobPostId, Status status, applicantId);
    //}

}
