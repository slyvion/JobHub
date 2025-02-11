package JobHub.backend.Model.Dto.User;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;


@Data
@NoArgsConstructor
public class UserEmailUpdateDto {

    @NotBlank(message = "Email is required")
    @Email
    private String email;

    public UserEmailUpdateDto(String email) {

        this.email = email;
    }
}
