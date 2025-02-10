package timski.proekt.backend.Service.impl;


import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import timski.proekt.backend.Model.Company;
import timski.proekt.backend.Model.Constants.EmploymentType;
import timski.proekt.backend.Model.Constants.Tags;
import timski.proekt.backend.Model.Dto.JobPostDto;
import timski.proekt.backend.Model.JobPost;
import timski.proekt.backend.Model.Constants.JobType;
import timski.proekt.backend.Repository.CompanyRepository;
import timski.proekt.backend.Repository.JobPostRepository;
import timski.proekt.backend.Service.JobPostService;
import timski.proekt.backend.exceptions.InvalidCompanyIdException;
import timski.proekt.backend.exceptions.InvalidJobPostIdException;

import java.util.ArrayList;
import java.util.List;

@Service
public class JobPostServiceImpl implements JobPostService {

    private final JobPostRepository jobPostRepository;
    private final CompanyRepository companyRepository;

    public JobPostServiceImpl(JobPostRepository jobPostRepository, CompanyRepository companyRepository) {
        this.jobPostRepository = jobPostRepository;
        this.companyRepository = companyRepository;
    }


    @Override
    public List<JobPost> listAll() {
        return jobPostRepository.findAll();
    }

    @Override
    public JobPost findById(Long id) {
        return jobPostRepository.findById(id).orElseThrow(InvalidJobPostIdException::new);
    }

    @Override
    public JobPost create(JobPostDto jobPostDto) {

        Company company = companyRepository.findById(jobPostDto.getCompanyId()).orElseThrow(InvalidCompanyIdException::new);
        JobPost jobPost = new JobPost(
                jobPostDto.getTitle(),
                jobPostDto.getDescription(),
                company,
                jobPostDto.getJobType(),
                jobPostDto.getEmploymentType(),
                jobPostDto.getLocation()
        );
    return null;
    }

    @Override
    public JobPost update(Long id, JobPostDto jobPostDto) {
        JobPost jobPost = this.findById(id);
            jobPost.setTitle(jobPostDto.getTitle());
            jobPost.setJobType(jobPostDto.getJobType());
            jobPost.setDescription(jobPostDto.getDescription());
            jobPost.setEmploymentType(jobPostDto.getEmploymentType());
            jobPost.setLocation(jobPostDto.getLocation());
            jobPost.setTags(jobPostDto.getTags());

        return jobPostRepository.save(jobPost);
    }

    @Override
    public JobPost delete(Long id) {
        JobPost jobPost = this.findById(id);
        jobPostRepository.delete(jobPost);
        return jobPost;
    }


    @Override
    public List<JobPost> findAllByTitle(String title) {
        return jobPostRepository.findJobPostsByTitle(title);
    }

    @Override
    public List<JobPost> findAllByCompany(Company company) {
        return jobPostRepository.findJobPostsByCompany(company);
    }

    @Override
    public List<JobPost> findAllByDescription(String description) {
        return jobPostRepository.findJobPostsByDescription(description);
    }

    @Override
    public List<JobPost> findAllByLocation(String location) {
        return jobPostRepository.findJobPostsByLocation(location);
    }

    @Override
    public List<JobPost> findJobPostsByCompanyId(long id) {
        return jobPostRepository.findJobPostsByCompanyId(id);
    }

    @Override
    public List<JobPost> findAllByJobType(JobType jobType) {
        return jobPostRepository.findJobPostsByJobType(jobType);
    }

    @Override
    public List<JobType> findAllByEmploymentType(EmploymentType employmentType) {
        return jobPostRepository.findJobPostsByEmploymentType(employmentType);
    }

    @Override
    public List<JobPost> jobPostFilter(String title, Company company, String location, JobType jobType, EmploymentType employmentType) {
        return jobPostRepository.findAll((Specification<JobPost>) (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (title != null) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + title.toLowerCase() + "%"));
            }
            if (company != null) {
                predicates.add(criteriaBuilder.equal(root.get("company"), company));
            }
            if (location != null) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("location")), "%" + location.toLowerCase() + "%"));
            }
            if (jobType != null) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("jobType").as(String.class)), "%" + jobType.toString().toLowerCase() + "%"));
            }
            if (employmentType != null) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("employmentType").as(String.class)), "%" + employmentType.toString().toLowerCase() + "%"));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }
}
