package timski.proekt.backend.Service;

import timski.proekt.backend.Model.Company;
import timski.proekt.backend.Model.Constants.EmploymentType;
import timski.proekt.backend.Model.Constants.Tags;
import timski.proekt.backend.Model.Dto.JobPostDto;
import timski.proekt.backend.Model.JobPost;
import timski.proekt.backend.Model.Constants.JobType;

import java.util.List;

public interface JobPostService {

    List<JobPost> listAll();

    JobPost findById(Long id);

    JobPost create(JobPostDto jobPostDto);

    JobPost update(Long id, JobPostDto jobPostDto);

    JobPost delete(Long id);


    List<JobPost> findAllByTitle(String title);

    List<JobPost> findAllByCompany(Company company);

    List<JobPost> findAllByDescription(String description);

    List<JobPost> findAllByLocation(String location);

    List<JobPost> findJobPostsByCompanyId(long id);

    List<JobPost> findAllByJobType(JobType jobType);

    List<JobType> findAllByEmploymentType(EmploymentType employmentType);

    List<JobPost> jobPostFilter(String title, Company company, String location, JobType jobType, EmploymentType employmentType);
}