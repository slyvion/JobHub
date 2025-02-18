package JobHub.backend.Service;

import JobHub.backend.Model.Company;
import JobHub.backend.Model.Constants.EmploymentType;
import JobHub.backend.Model.Constants.JobType;
import JobHub.backend.Model.Dto.JobPostDto;
import JobHub.backend.Model.JobPost;

import java.util.List;

public interface JobPostService {

    List<JobPost> listAll();

    JobPost findById(Long id);

    JobPost create(JobPostDto jobPostDto);

    JobPost update(Long id, JobPostDto jobPostDto);

    JobPost delete(Long id);

    List<JobPost> findAllByTitle(String title);

    List<JobPost> findAllByCompany(Company company);

    List<JobPost> findAllByCompanyName(String companyName);

    List<JobPost> findAllByDescription(String description);

    List<JobPost> findAllByLocation(String location);

    List<JobPost> findJobPostsByCompanyId(long id);

    List<JobPost> findAllByJobType(JobType jobType);

    List<JobType> findAllByEmploymentType(EmploymentType employmentType);

    List<JobPost> jobPostFilter(String title, String companyName, String location, JobType jobType, EmploymentType employmentType);
}