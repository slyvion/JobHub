package timski.proekt.backend.Model.Dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
public class CompanyWebsiteUpdateDto {

    @NotBlank(message = "Website is required")
    private String website;

    public CompanyWebsiteUpdateDto(String website) {
        this.website = website;
    }
}
