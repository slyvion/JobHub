package JobHub.backend.Model;

import JobHub.backend.Model.Constants.Seniority;
import JobHub.backend.Model.Constants.Tags;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Id;
import JobHub.backend.Model.Constants.EmploymentType;
import JobHub.backend.Model.Constants.JobType;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class JobPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description; // About the role
    @Lob
    @Column(columnDefinition = "TEXT")
    private String requirements; // requirements
    @Lob
    @Column(columnDefinition = "TEXT")
    private String jobInfo; // What you will do

    private Boolean isLink;

    private String applicationLink;

    @ManyToOne
    private Company company;

    @Enumerated(EnumType.STRING)
    private JobType jobType;

    @Enumerated(EnumType.STRING)
    private EmploymentType employmentType;

    @Enumerated(EnumType.STRING)
    private Seniority seniority;

    private String location;

    @OneToMany(mappedBy = "jobPost", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Apply> applicants;


    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private List<Tags> tags;

    public JobPost(String title, String description, String requirements, String jobInfo, String applicationLink,Boolean isLink, Company company, JobType jobType, EmploymentType employmentType, Seniority seniority, String location, List<Tags> tags) {
        this.title = title;
        this.description = description;
        this.requirements = requirements;
        this.jobInfo = jobInfo;
        this.applicationLink = applicationLink;
        this.isLink = isLink;
        this.company = company;
        this.jobType = jobType;
        this.employmentType = employmentType;
        this.seniority = seniority;
        this.location = location;
        this.tags = tags;
    }
}
