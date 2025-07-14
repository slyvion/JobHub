package JobHub.backend.Service;

import JobHub.backend.Model.Apply;
import JobHub.backend.Model.Company;
import JobHub.backend.Model.Constants.EmploymentType;
import JobHub.backend.Model.Constants.JobType;
import JobHub.backend.Model.Constants.Seniority;
import JobHub.backend.Model.Constants.Tags;
import JobHub.backend.Model.Dto.JobPostDto;
import JobHub.backend.Model.Dto.JobPostSearchDto;
import JobHub.backend.Model.Dto.User.ApplyDto;
import JobHub.backend.Model.JobPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface JobPostService {

    Integer jobpostsCount();


    List<JobPost> listAll();

    JobPost findById(Long id);

    JobPost create(JobPostDto jobPostDto);

    JobPost update(Long id, JobPostDto jobPostDto);

    JobPost delete(Long id);

    List<Apply> findApplicantsByJobpostId(Long id);

    Apply apply(Long id,ApplyDto applyDto);


    List<JobPost> findAllByTitle(String title);

    List<JobPost> findAllByCompany(Company company);

    List<JobPost> findAllByCompanyName(String companyName);

    List<JobPost> findAllByDescription(String description);

    List<JobPost> findAllByLocation(String location);

    List<JobPost> findJobPostsByCompanyId(long id);

    List<JobPost> findAllByJobType(JobType jobType);

    List<JobType> findAllByEmploymentType(EmploymentType employmentType);

    List<JobPost> findAllByTags(List<Tags> tags);

    List<JobPost> findAllBySeniority(Seniority seniority);

    Page<JobPost> jobPostFilter(JobPostSearchDto searchDto, Pageable pageable);
}