package JobHub.backend.Model.Dto.Company;

import JobHub.backend.Model.Constants.EmployeeNumber;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CompanyEmployeeNumberUpdateDto {

    private EmployeeNumber employeeNumber;

    public CompanyEmployeeNumberUpdateDto(EmployeeNumber employeeNumber) {
        this.employeeNumber = employeeNumber;
    }
}
