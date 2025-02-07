package timski.proekt.backend.Model.Dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
public class CompanyBioUpdateDto {

    @NotBlank(message = "Description is required")
    private String description;

    public CompanyBioUpdateDto(String description) {
        this.description = description;
    }
}