package JobHub.backend.Model;

import JobHub.backend.Model.Constants.EmployeeNumber;
import jakarta.persistence.*;

import lombok.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
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

    private String phoneNumber;

    private String facebookLink;
    private String instagramLink;
    private String linkedinLink;

    @Enumerated(EnumType.STRING)
    private EmployeeNumber employeeNumber;

    @Column(nullable = true)
    private double rating;

    @Lob
    private byte[] companyLogo;

    @Lob
    private byte[] companyCover;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Review> reviews = new ArrayList<>();

    public Company(String companyName,
                   String email,
                   String password,
                   String website,
                   String description,
                   String location,
                   EmployeeNumber employeeNumber,
                   String phoneNumber,
                   String facebookLink,
                   String instagramLink,
                   String linkedinLink) {
        this.companyName = companyName;
        this.email = email;
        this.password = password;
        this.website = website;
        this.description = description;
        this.location = location;
        this.employeeNumber = employeeNumber;
        this.reviews = new ArrayList<>();
        this.rating = 0;
        this.phoneNumber = phoneNumber;
        this.facebookLink = facebookLink;
        this.instagramLink = instagramLink;
        this.linkedinLink = linkedinLink;

        try {
            this.companyLogo = Files.readAllBytes(Paths.get("src/main/resources/static/defaultLogo.png"));
            this.companyCover = Files.readAllBytes(Paths.get("src/main/resources/static/defaultCover.png"));
        } catch (IOException e) {
            e.printStackTrace();
            this.companyLogo = null;
            this.companyCover = null;
        }
    }

    public void updateRating() {
        if (reviews.isEmpty()) {
            this.rating = 0;
        } else {
            double averageRating = reviews.stream()
                    .mapToDouble(Review::getRating)
                    .average()
                    .orElse(0);
            this.rating = averageRating;
        }
    }

}
