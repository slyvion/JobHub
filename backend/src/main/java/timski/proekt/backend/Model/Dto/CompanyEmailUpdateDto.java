package timski.proekt.backend.Model.Dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
public class CompanyEmailUpdateDto {
    @NotBlank(message = "Email is required")
    @Email
    private String email;
}