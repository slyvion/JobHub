package timski.proekt.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import timski.proekt.backend.Model.Company;
import timski.proekt.backend.Model.Constants.EmploymentType;
import timski.proekt.backend.Model.JobPost;
import timski.proekt.backend.Model.Constants.JobType;

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
