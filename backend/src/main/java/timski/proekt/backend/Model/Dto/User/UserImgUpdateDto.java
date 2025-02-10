package timski.proekt.backend.Model.Dto.User;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserImgUpdateDto {

    private String userImage;

    public UserImgUpdateDto(String userImage) {
        this.userImage = userImage;
    }
}
