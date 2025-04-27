package JobHub.backend.Model.Dto;

import JobHub.backend.Model.Constants.EmploymentType;
import JobHub.backend.Model.Constants.JobType;
import JobHub.backend.Model.Constants.Seniority;
import JobHub.backend.Model.Constants.Tags;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobPostSearchDto {

        private String title;

        private String companyName;

        private String location;

        private JobType jobType;

        private EmploymentType employmentType;

        private Seniority seniority;

        private List<Tags> tags;

}
