package JobHub.backend.Model;

import JobHub.backend.Model.Constants.Status;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Apply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private String linkedinLink;

    @JsonIgnore
    private byte[] attachment;

    private String attachmentFileName;

    private String attachmentContentType;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(columnDefinition = "TEXT")
    private String additionalMessage;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private JobPost jobPost;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public Apply(String firstName, String lastName, String email, String phoneNumber, String linkedinLink, byte[] attachment, String additionalMessage, JobPost jobPost, User user, String attachmentFileName, String attachmentContentType) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.linkedinLink = linkedinLink;
        this.attachment = attachment;
        this.status = Status.PENDING;
        this.additionalMessage = additionalMessage;
        this.jobPost = jobPost;
        this.user = user;
        this.attachmentFileName = attachmentFileName;
        this.attachmentContentType = attachmentContentType;
    }

    public Apply() {

    }
}
