package JobHub.backend.Model.Dto.Company;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CompanyFoundedUpdateDto {

    private Integer founded;

    public CompanyFoundedUpdateDto(Integer founded) {
        this.founded = founded;
    }
}
