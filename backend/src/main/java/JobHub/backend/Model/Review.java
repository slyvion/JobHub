package JobHub.backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDateTime;
import java.util.Date;

@Entity
@NoArgsConstructor
@Data
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ManyToOne
    private User user;

    @ManyToOne
    private Company company;

    private Long rating;

    private String pros;

    private String cons;

    private LocalDateTime postDate;

    @PrePersist
    protected void onCreate() {
        this.postDate = LocalDateTime.now();
    }
    public Review(String title, User user, Company company, Long rating, String pros, String cons) {
        this.title = title;
        this.user = user;
        this.company = company;
        this.rating = rating;
        this.pros = pros;
        this.cons = cons;

    }
}
