package timski.proekt.backend.Model.Dto;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
public class CompanyNameUpdateDto {

    @NotBlank(message = "Company name is required")
    private String companyName;

    public CompanyNameUpdateDto(String companyName) {
        this.companyName = companyName;
    }
}