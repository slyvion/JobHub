package JobHub.backend.Model.Dto;

import JobHub.backend.Model.Constants.Seniority;
import JobHub.backend.Model.Constants.Tags;
import lombok.Data;
import JobHub.backend.Model.Constants.EmploymentType;
import JobHub.backend.Model.Constants.JobType;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class JobPostDto {

    private Long companyId;

    private Long jobpostId;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Job post description is required")
    private String description;

    @NotBlank(message = "Job post requirements are required")
    private String requirements;

    @NotBlank(message = "Job post info is required")
    private String jobInfo;

    @NotNull(message = "Job Type is required")
    private JobType jobType;

    @NotNull(message = "Employment type is required")
    private EmploymentType employmentType;

    @NotBlank(message = "Location is required")
    private String location;

    private Seniority seniority;

    private List<Tags> tags;

    private String applicationLink;

    private Boolean isLink;

    public JobPostDto() {
    }

    public JobPostDto(Long companyId, String title,String applicationLink ,Seniority seniority, String description, String requirements, String jobInfo, JobType jobType, EmploymentType employmentType, String location, List<Tags> tags) {
        this.companyId = companyId;
        this.title = title;
        this.description = description;
        this.requirements = requirements;
        this.seniority = seniority;
        this.applicationLink = applicationLink;
        this.jobInfo = jobInfo;
        this.jobType = jobType;
        this.employmentType = employmentType;
        this.location = location;
        this.tags = tags;
    }
}
