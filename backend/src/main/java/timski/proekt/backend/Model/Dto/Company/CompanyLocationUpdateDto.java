package timski.proekt.backend.Model.Dto.Company;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
public class CompanyLocationUpdateDto {

    @NotBlank(message = "Location is required")
    private String location;

    public CompanyLocationUpdateDto(String location) {
        this.location = location;
    }
}