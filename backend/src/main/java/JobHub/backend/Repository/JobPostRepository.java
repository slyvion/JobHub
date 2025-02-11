package JobHub.backend.Repository;

import JobHub.backend.Model.Company;
import JobHub.backend.Model.Constants.EmploymentType;
import JobHub.backend.Model.Constants.JobType;
import JobHub.backend.Model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobPostRepository extends JpaRepository<JobPost, Long>, JpaSpecificationExecutor<JobPost> {

    List<JobPost> findJobPostsByTitle(String title);
    List<JobPost> findJobPostsByCompany(Company company);

    List<JobPost> findJobPostsByCompanyId(long id);
    List<JobPost> findJobPostsByDescription(String description);
    List<JobPost> findJobPostsByLocation(String location);
    List<JobPost> findJobPostsByJobType(JobType jobType);
    List<JobType> findJobPostsByEmploymentType(EmploymentType employmentType);
}
