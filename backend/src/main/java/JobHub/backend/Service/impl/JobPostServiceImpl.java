package JobHub.backend.Service.impl;


import JobHub.backend.Model.Apply;
import JobHub.backend.Model.Constants.Seniority;
import JobHub.backend.Model.Constants.Tags;
import JobHub.backend.Model.Dto.JobPostSearchDto;
import JobHub.backend.Model.Dto.User.ApplyDto;
import JobHub.backend.Repository.ApplicantsRepository;
import JobHub.backend.exceptions.InvalidUserIdException;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import JobHub.backend.Model.Company;
import JobHub.backend.Model.Constants.EmploymentType;
import JobHub.backend.Model.Dto.JobPostDto;
import JobHub.backend.Model.JobPost;
import JobHub.backend.Model.Constants.JobType;
import JobHub.backend.Repository.CompanyRepository;
import JobHub.backend.Repository.JobPostRepository;
import JobHub.backend.Service.JobPostService;
import JobHub.backend.exceptions.InvalidCompanyIdException;
import JobHub.backend.exceptions.InvalidJobPostIdException;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class JobPostServiceImpl implements JobPostService {

    private final JobPostRepository jobPostRepository;
    private final CompanyRepository companyRepository;

    private final ApplicantsRepository applicantsRepository;

    public JobPostServiceImpl(JobPostRepository jobPostRepository, CompanyRepository companyRepository, ApplicantsRepository applicantsRepository) {
        this.jobPostRepository = jobPostRepository;
        this.companyRepository = companyRepository;
        this.applicantsRepository = applicantsRepository;
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
                jobPostDto.getRequirements(),
                jobPostDto.getJobInfo(),
                jobPostDto.getApplicationLink(),
                company,
                jobPostDto.getJobType(),
                jobPostDto.getEmploymentType(),
                jobPostDto.getSeniority(),
                jobPostDto.getLocation(),
                jobPostDto.getTags()
        );

        return jobPostRepository.save(jobPost);
    }

    @Override
    public JobPost update(Long id, JobPostDto jobPostDto) {
        JobPost jobPost = this.findById(id);
        jobPost.setTitle(jobPostDto.getTitle());
        jobPost.setJobType(jobPostDto.getJobType());
        jobPost.setSeniority(jobPostDto.getSeniority());
        jobPost.setDescription(jobPostDto.getDescription());
        jobPost.setJobInfo(jobPostDto.getJobInfo());
        jobPost.setRequirements(jobPostDto.getRequirements());
        jobPost.setApplicationLink(jobPostDto.getApplicationLink());
        jobPost.setTags(jobPostDto.getTags());
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
    public List<Apply> findApplicantsByJobpostId(Long id) {
        JobPost jobPost = this.findById(id);
        return applicantsRepository.findByJobPostId(jobPost.getId());
    }

    @Override
    public Apply apply(ApplyDto applyDto) {
        JobPost jobpost = jobPostRepository.findById(applyDto.getJobPost().getId()).orElseThrow(InvalidJobPostIdException::new);

        byte[] attachmentBytes = null;
        if (applyDto.getAttachment() != null) {
            try {
                attachmentBytes = applyDto.getAttachment().getBytes();
            } catch (IOException e) {
                throw new RuntimeException("Failed to process the file upload.", e);
            }
        }

        Apply apply = new Apply(
                applyDto.getFirstName(),
                applyDto.getLastName(),
                applyDto.getEmail(),
                applyDto.getPhoneNumber(),
                applyDto.getLinkedinLink(),
                attachmentBytes,
                applyDto.getAdditionalMessage(),
                applyDto.getJobPost(),
                applyDto.getUser()
        );

        Apply savedApplication = applicantsRepository.save(apply);
        jobpost.getApplicants().add(savedApplication);

        return savedApplication;
    }

    @Override
    public List<JobPost> findAllByTitle(String title) {
        return jobPostRepository.findJobPostsByTitle(title);
    }

    @Override
    public List<JobPost> findAllByCompanyName(String companyName) {
        return jobPostRepository.findJobPostsByCompanyCompanyName(companyName);
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


    @Transactional(readOnly = true)
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
    public List<JobPost> findAllByTags(List<Tags> tags) {
        return jobPostRepository.findJobPostsByTags(tags);
    }

    @Override
    public List<JobPost> findAllBySeniority(Seniority seniority) {
        return jobPostRepository.findJobPostsBySeniority(seniority);
    }


    @Override
    public Page<JobPost> jobPostFilter(JobPostSearchDto searchDto, Pageable pageable) {
        Specification<JobPost> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (searchDto.getTitle() != null) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("title")),
                        "%" + searchDto.getTitle().toLowerCase() + "%"
                ));
            }

            if (searchDto.getCompanyName() != null) {
                Join<JobPost, Company> companyJoin = root.join("company");
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(companyJoin.get("companyName")),
                        "%" + searchDto.getCompanyName().toLowerCase() + "%"
                ));
            }

            if (searchDto.getLocation() != null) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("location")),
                        "%" + searchDto.getLocation().toLowerCase() + "%"
                ));
            }

            if (searchDto.getJobType() != null) {
                predicates.add(criteriaBuilder.equal(root.get("jobType"), searchDto.getJobType()));
            }

            if (searchDto.getEmploymentType() != null) {
                predicates.add(criteriaBuilder.equal(root.get("employmentType"), searchDto.getEmploymentType()));
            }

            if (searchDto.getSeniority() != null) {
                predicates.add(criteriaBuilder.equal(root.get("seniority"), searchDto.getSeniority()));
            }

            if (searchDto.getTags() != null && !searchDto.getTags().isEmpty()) {
                Join<JobPost, Tags> tagsJoin = root.join("tags");
                predicates.add(tagsJoin.in(searchDto.getTags()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        return jobPostRepository.findAll(spec, pageable);
    }

}
