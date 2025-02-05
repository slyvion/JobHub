package timski.proekt.backend.Model.Dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
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

    public CompanyDto() {
    }

    public CompanyDto(String companyName, String email, String password, String website, String description, String location) {
        this.companyName = companyName;
        this.email = email;
        this.password = password;
        this.website = website;
        this.description = description;
        this.location = location;
    }
}
