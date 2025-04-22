package JobHub.backend.Model.Dto.Company;

import JobHub.backend.Model.Constants.EmployeeNumber;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompanyDetailsDto {

    private String companyName;

    private String email;

    private String website;

    private String description;

    private String location;

    private String phoneNumber;

    private String facebookLink;
    private String instagramLink;
    private String linkedinLink;

    private Integer founded;

    private List<String> cities = new ArrayList<>();

    private EmployeeNumber employeeNumber;

    private Double rating;
}
