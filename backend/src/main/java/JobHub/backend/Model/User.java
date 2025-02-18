package JobHub.backend.Model;

import JobHub.backend.Model.Constants.UserRole;
import jakarta.persistence.*;
import lombok.Data;

import lombok.NoArgsConstructor;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;


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


    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = UserRole.USER; // Default role set here

    }
}
