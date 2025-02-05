package timski.proekt.backend.Web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import timski.proekt.backend.Model.Company;
import timski.proekt.backend.Model.Dto.CompanyDto;
import timski.proekt.backend.Model.Dto.ReviewDto;
import timski.proekt.backend.Model.JobPost;
import timski.proekt.backend.Model.Review;
import timski.proekt.backend.Service.CompanyService;
import timski.proekt.backend.Service.JobPostService;
import timski.proekt.backend.Service.ReviewService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @Autowired
    private ReviewService reviewService;


    @GetMapping("/{id}")
    public Company getCompanyById(@PathVariable Long id) {
        return companyService.findById(id);
    }

    @PostMapping
    public Company create(@Valid @RequestBody CompanyDto companyDto) {
        return companyService.create(
                companyDto
        );
    }


    @PutMapping("/{id}/edit")
    public Company update(@PathVariable Long id,
                          @Valid @RequestBody CompanyDto companyDto) {
        return companyService.update(
                id,
                companyDto
        );
    }


    @PostMapping("/{id}/delete")
    public String deleteCompany(@PathVariable Long id) {
        companyService.delete(id);
        return "redirect:/companies";
    }

    @PutMapping("/{id}/add-review")
    public Review addReview(@Valid @RequestBody ReviewDto reviewDto, @PathVariable String id) {
        return reviewService.create(reviewDto);
    }



}