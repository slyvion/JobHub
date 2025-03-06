package JobHub.backend.Model.Dto.Company;

import lombok.Data;

import java.util.List;

@Data
public class CompanyCitiesUpdateDto {
    private Long companyId;
    private List<String> cities;

}
