package JobHub.backend.Model.Dto.Company;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CompanyLogoUpdateDto {

    private String companyLogo;

    public CompanyLogoUpdateDto(String companyLogo) {
        this.companyLogo = companyLogo;
    }
}

