package JobHub.backend.Model.Dto.Company;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Pattern;

@Data
@NoArgsConstructor
public class CompanySocialMediaUpdateDto {

    @Pattern(regexp = "^(http(s?)://)?(www\\.)?[a-zA-Z0-9-]+(\\.[a-zA-Z]{2,})+(/.*)?$",
            message = "Website URL should be valid")
    private String facebookLink;

    @Pattern(regexp = "^(http(s?)://)?(www\\.)?[a-zA-Z0-9-]+(\\.[a-zA-Z]{2,})+(/.*)?$",
            message = "Website URL should be valid")
    private String instagramLink;

    @Pattern(regexp = "^(http(s?)://)?(www\\.)?[a-zA-Z0-9-]+(\\.[a-zA-Z]{2,})+(/.*)?$",
            message = "Website URL should be valid")
    private String linkedinLink;

    public CompanySocialMediaUpdateDto(String facebookLink, String instagramLink, String linkedinLink) {
        this.facebookLink = facebookLink;
        this.instagramLink = instagramLink;
        this.linkedinLink = linkedinLink;
    }
}
