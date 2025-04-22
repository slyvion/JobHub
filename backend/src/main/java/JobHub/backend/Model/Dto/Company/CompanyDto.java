package JobHub.backend.Model.Dto.Company;

import JobHub.backend.Model.Company;
import JobHub.backend.Model.Constants.EmployeeNumber;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Base64;

@Data
@NoArgsConstructor
public class CompanyDto {

    private String companyName;

    private String email;

    private String website;

    private String description;

    private String location;

    private Integer founded;

    private Double rating;

    private EmployeeNumber employeeNumber;


    private String phoneNumber;

    private String facebookLink;

    private String instagramLink;

    private String linkedinLink;

    public CompanyDto(Company company) {
        this.companyName = company.getCompanyName();
        this.email = company.getEmail();
        this.website = company.getWebsite();
        this.description = company.getDescription();
        this.location = company.getLocation();
        this.rating = company.getRating();
        this.employeeNumber = company.getEmployeeNumber();
        this.phoneNumber = company.getPhoneNumber();
        this.facebookLink = company.getFacebookLink();
        this.instagramLink = company.getInstagramLink();
        this.linkedinLink = company.getLinkedinLink();
    }
}