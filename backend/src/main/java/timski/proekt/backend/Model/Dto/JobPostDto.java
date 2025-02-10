package timski.proekt.backend.Model.Dto;

import lombok.Data;
import timski.proekt.backend.Model.Constants.EmploymentType;
import timski.proekt.backend.Model.Constants.JobType;
import timski.proekt.backend.Model.Constants.Tags;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class JobPostDto {

    private long companyId;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Job post description is required")
    private String description;

    @NotNull(message = "Job Type is required")
    private JobType jobType;

    @NotNull(message = "Employment type is required")
    private EmploymentType employmentType;

    @NotBlank(message = "Location is required")
    private String location;

    private List<Tags> tags;

    public JobPostDto() {
    }

    public JobPostDto(String title, String description, long companyId, JobType jobType, EmploymentType employmentType, String location, List<Tags> tags) {
        this.title = title;
        this.description = description;
        this.companyId = companyId;
        this.jobType = jobType;
        this.employmentType = employmentType;
        this.location = location;
        this.tags = tags;
    }
}
