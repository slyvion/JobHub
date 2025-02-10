package timski.proekt.backend.Model.Dto.Company;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CompanyCoverUpdateDto {

    private String companyCover;

    public CompanyCoverUpdateDto(String  companyCover) {
        this.companyCover = companyCover;
    }
}
