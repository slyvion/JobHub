package timski.proekt.backend.Model.Dto.Company;

import lombok.Data;
import lombok.NoArgsConstructor;
import timski.proekt.backend.Model.Company;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Base64;

@Data
@NoArgsConstructor
public class CompanyDto {

    @NotBlank(message = "Company name is mandatory")
    @Size(max = 30, message = "Company name must be less than 30 characters")
    private String companyName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @Pattern(regexp = "^(http(s?)://)?(www\\.)?[a-zA-Z0-9-]+(\\.[a-zA-Z]{2,})+(/.*)?$",
            message = "Website URL should be valid")
    private String website;

    private String description;

    @NotBlank(message = "Location is required")
    private String location;

    private Double rating;

    private String companyLogo;

    private String companyCover;

    public CompanyDto(Company company) {
        this.companyName = company.getCompanyName();
        this.email = company.getEmail();
        this.password = company.getPassword();
        this.website = company.getWebsite();
        this.description = company.getDescription();
        this.location = company.getLocation();
        this.rating = company.getRating();

        this.companyLogo = company.getCompanyLogo() != null
                ? "data:image/png;base64," + Base64.getEncoder().encodeToString(company.getCompanyLogo())
                : null;

        this.companyCover = company.getCompanyCover() != null
                ? "data:image/png;base64," + Base64.getEncoder().encodeToString(company.getCompanyCover())
                : null;
    }
}
