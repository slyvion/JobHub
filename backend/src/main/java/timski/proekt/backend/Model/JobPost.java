package timski.proekt.backend.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Id;
import timski.proekt.backend.Model.Constants.EmploymentType;
import timski.proekt.backend.Model.Constants.JobType;
import timski.proekt.backend.Model.Constants.Tags;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class JobPost {

    @Id
    @GeneratedValue
    private Long id;

    private String title;

    private String description;

    @ManyToOne
    private Company company;

    @Enumerated(EnumType.STRING)
    private JobType jobType;

    @Enumerated(EnumType.STRING)
    private EmploymentType employmentType;

    private String location;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private List<Tags> tags;

    public JobPost(String title, String description, Company company, JobType jobType, EmploymentType employmentType, String location) {
        this.title = title;
        this.description = description;
        this.company = company;
        this.jobType = jobType;
        this.employmentType = employmentType;
        this.location = location;
    }
}
