package JobHub.backend.Model.Dto.User;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
public class UserPasswordUpdateDto {


    @NotBlank(message = "Provide old password")
    private String oldPassword;

    @NotBlank(message = "New password is missing")
    private String newPassword;

    @NotBlank(message = "You haven't confirmed the new password")
    private String confirmPassword;

    public UserPasswordUpdateDto(String oldPassword, String newPassword, String confirmPassword) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
    }
}
