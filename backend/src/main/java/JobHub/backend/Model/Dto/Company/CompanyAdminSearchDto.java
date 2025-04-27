package JobHub.backend.Model.Dto.Company;

import JobHub.backend.Model.Constants.EmployeeNumber;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyAdminSearchDto {

    private String companyName;

    private String location;

    private Double rating;

    private EmployeeNumber employeeNumber;

    private Integer founded;

    private String email;

    private String website;

}
