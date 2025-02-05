package timski.proekt.backend.Model.Dto;

import lombok.Data;
import timski.proekt.backend.Model.Constants.EmploymentType;
import timski.proekt.backend.Model.Constants.JobType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class JobPostDto {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Job post description is required")
    private String description;

    private long companyId;

    @NotNull(message = "Job Type is required")
    private JobType jobType;

    @NotNull(message = "Employment type is required")
    private EmploymentType employmentType;

    @NotBlank(message = "Location is required")
    private String location;

    public JobPostDto() {
    }

    public JobPostDto(String title, String description, long companyId, JobType jobType, EmploymentType employmentType, String location) {
        this.title = title;
        this.description = description;
        this.companyId = companyId;
        this.jobType = jobType;
        this.employmentType = employmentType;
        this.location = location;
    }
}
