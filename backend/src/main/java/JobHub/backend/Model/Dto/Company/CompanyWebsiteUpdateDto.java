package JobHub.backend.Model.Dto.Company;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@NoArgsConstructor
public class CompanyWebsiteUpdateDto {

    @Pattern(regexp = "^(http(s?)://)?(www\\.)?[a-zA-Z0-9-]+(\\.[a-zA-Z]{2,})+(/.*)?$",
            message = "Website URL should be valid")
    @NotBlank(message = "Website is required")
    private String website;

    public CompanyWebsiteUpdateDto(String website) {
        this.website = website;
    }
}
