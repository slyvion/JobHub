package JobHub.backend.Model.Dto.User;

import JobHub.backend.Model.Constants.UserRole;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserRoleUpdateDto {

    private UserRole userRole;

    public UserRoleUpdateDto(UserRole userRole) {
        this.userRole = userRole;
    }
}
