package JobHub.backend.Model.Dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
public class ReviewDto {

    @NotBlank
    private String title;

    private long userId;

    private long companyId;

    @NotBlank
    private Long rating; // req


    private String pros;

    private String cons;

    private Date postDate;

    public ReviewDto() {
    }

    public ReviewDto(String title, long userId, long companyId, Long rating, String cons, String pros) {
        this.title = title;
        this.userId = userId;
        this.companyId = companyId;
        this.rating = rating;
        this.pros = pros;
        this.cons = cons;

    }
}
