package JobHub.backend.Model.Dto.User;

import JobHub.backend.Model.Constants.UserRole;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
public class UserDto {

    @NotBlank(message = "Username is mandatory")
    @Size(max = 15, message = "Username must be less than 15 characters")
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    private UserRole role;

    private String userImage;

}
