package JobHub.backend.Model.Dto.Company;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class CompanyCreateDto {

    @NotBlank(message = "Company name is mandatory")
    @Size(max = 30, message = "Company name must be less than 30 characters")
    private String companyName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "Location is required")
    private String location;
}
