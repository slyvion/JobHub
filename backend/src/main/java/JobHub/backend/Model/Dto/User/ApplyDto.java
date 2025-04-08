package JobHub.backend.Model.Dto.User;

import JobHub.backend.Model.Constants.Status;
import JobHub.backend.Model.JobPost;
import JobHub.backend.Model.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
public class ApplyDto {

    @NotBlank(message = "First Name is required")
    private String firstName;

    @NotBlank(message = "Last Name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "phone number is required")
    private String phoneNumber;

    private String linkedinLink;

    private String additionalMessage;

    private MultipartFile attachment;

    private Status status;

    private JobPost jobPost;

    private User user;
}
