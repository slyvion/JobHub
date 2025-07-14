package JobHub.backend.Model;

import JobHub.backend.Model.Constants.EmployeeNumber;
import JobHub.backend.Model.Dto.Company.CompanyDetailsDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    private Integer founded;

    @ElementCollection
    @CollectionTable(name = "company_cities", joinColumns = @JoinColumn(name = "company_id"))
    @Column(name = "city")
    private List<String> cities = new ArrayList<>();


    @Enumerated(EnumType.STRING)
    private EmployeeNumber employeeNumber;

    @Column(nullable = true)
    private double rating;

    @Lob
    @Column(name = "company_logo", nullable = true)
    private byte[] companyLogo;
    private String logoType;    // e.g., "image/jpeg"
    private String logoExtension; // e.g., "png"

    @Lob
    @Column(name = "company_cover", nullable = true)
    private byte[] companyCover;
    private String coverType;    // e.g., "image/jpeg"
    private String coverExtension; // e.g., "png"

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Review> reviews = new ArrayList<>();

    public Company(String companyName, String email, String password, String location) {
        this.companyName = companyName;
        this.email = email;
        this.password = password;
        this.location = location;
        try {
            this.companyLogo = Files.readAllBytes(Paths.get("src/main/resources/static/defaultLogo.png"));
            this.companyCover = Files.readAllBytes(Paths.get("src/main/resources/static/defaultCover.png"));
        } catch (IOException e) {
            e.printStackTrace();
            this.companyLogo = null;
            this.companyCover = null;
        }
        this.website = "";
        this.description = "";
        this.founded = null;
        this.rating = 0;
        this.employeeNumber = null;
        this.phoneNumber = "";
        this.facebookLink = "";
        this.instagramLink = "";
        this.linkedinLink = "";
        this.reviews = new ArrayList<>();
        this.cities = new ArrayList<>();
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


    public CompanyDetailsDto mapToDetails() {
        return CompanyDetailsDto.builder()
                .companyName(this.getCompanyName())
                .email(this.getEmail())
                .website(this.getWebsite())
                .description(this.getDescription())
                .location(this.getLocation())
                .phoneNumber(this.getPhoneNumber())
                .facebookLink(this.getFacebookLink())
                .instagramLink(this.getInstagramLink())
                .linkedinLink(this.getLinkedinLink())
                .founded(this.getFounded())
                .cities(new ArrayList<>(this.getCities()))
                .employeeNumber(this.getEmployeeNumber())
                .rating(this.getRating())
                .build();
    }


}
