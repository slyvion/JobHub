package timski.proekt.backend.Model;

import jakarta.persistence.*;
import lombok.Data;

import lombok.NoArgsConstructor;
import timski.proekt.backend.Model.Constants.UserRole;


@Entity
@NoArgsConstructor
@Data
@Table(name = "AppUser")
public class User {

    @Id
    @GeneratedValue
    private Long id;

    private String username;

    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Lob
    private byte[] userImage;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = UserRole.USER; // Default role set here
    }
}
