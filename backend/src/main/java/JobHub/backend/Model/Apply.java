package JobHub.backend.Model;

import JobHub.backend.Model.Constants.Status;
import jakarta.persistence.*;

@Entity
public class Apply {

    @Id
    @GeneratedValue
    private Long id;

    private String firstName;
    private String lastName;

    private String email;

    private String phoneNumber;
    private String linkedinLink;

    private byte[] attachment;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String additionalMessage;

    @ManyToOne(fetch = FetchType.LAZY)
    private JobPost jobPost;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public Apply(String firstName, String lastName, String email, String phoneNumber, String linkedinLink, byte[] attachment, String additionalMessage, JobPost jobPost, User user) {
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
    }

    public Apply() {

    }
}
