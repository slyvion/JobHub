package timski.proekt.backend.Model;

import jakarta.persistence.*;

import lombok.*;
import org.hibernate.annotations.Fetch;

import java.util.ArrayList;
import java.util.List;


@Data
@NoArgsConstructor
@Entity
public class Company {

    @Id
    @GeneratedValue
    private Long id;

    private String companyName;

    private String email;

    private String password;

    private String website;
    private String description;
    private String location;

    @Column(nullable = true)
    private double rating;


    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Review> reviews = new ArrayList<>();

    public Company(String companyName, String email, String password, String website, String description, String location) {
        this.companyName = companyName;
        this.email = email;
        this.password = password;
        this.website = website;
        this.description = description;
        this.location = location;
        this.reviews = new ArrayList<>();
        this.rating = 0;
    }
}
