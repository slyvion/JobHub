package JobHub.backend.Model.Dto.Company;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CompanyPhoneUpdateDto {

    private String phoneNumber;

    public CompanyPhoneUpdateDto(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
