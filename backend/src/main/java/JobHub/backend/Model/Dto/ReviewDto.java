package JobHub.backend.Model.Dto;

import lombok.Data;

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
