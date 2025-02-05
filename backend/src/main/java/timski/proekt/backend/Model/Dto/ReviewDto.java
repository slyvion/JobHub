package timski.proekt.backend.Model.Dto;

import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import timski.proekt.backend.Model.Company;
import timski.proekt.backend.Model.User;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
public class ReviewDto {

    private String title;

    private long userId;

    private long companyId;

    @NotBlank
    private Long rating; // req


    private String comment; // non-required

    private Date postDate;

    public ReviewDto() {
    }

    public ReviewDto(String title, long userId, long companyId, Long rating, String comment) {
        this.title = title;
        this.userId = userId;
        this.companyId = companyId;
        this.rating = rating;
        this.comment = comment;

    }
}
