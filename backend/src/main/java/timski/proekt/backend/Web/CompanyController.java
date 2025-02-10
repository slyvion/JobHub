package timski.proekt.backend.Web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import timski.proekt.backend.Model.Company;
import timski.proekt.backend.Model.Dto.Company.*;
import timski.proekt.backend.Model.Dto.ReviewDto;
import timski.proekt.backend.Model.Review;
import timski.proekt.backend.Service.CompanyService;
import timski.proekt.backend.Service.ReviewService;

import javax.validation.Valid;

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
    public Review addReview(@Valid @RequestBody ReviewDto reviewDto, @PathVariable Long id) {
        return reviewService.create(reviewDto);
    }
    @PutMapping("/{id}/updateBio")
    public Company updateBio(@Valid @RequestBody CompanyBioUpdateDto companyBioUpdateDto, @PathVariable Long id){
        return companyService.bioUpdate(id, companyBioUpdateDto);
    }
    @PutMapping("/{id}/updateName")
    public Company updateName(@PathVariable Long id, @Valid @RequestBody CompanyNameUpdateDto companyNameUpdateDto){
        return companyService.nameUpdate(id, companyNameUpdateDto);
    }
    @PutMapping("/{id}/updateWebsite")
    public Company updateWebsite(@PathVariable Long id, @Valid @RequestBody CompanyWebsiteUpdateDto companyWebsiteUpdateDto){
        return companyService.websiteUpdate(id, companyWebsiteUpdateDto);
    }
    @PutMapping("/{id}/updateLocation")
    public Company updateLocation(@PathVariable Long id, @Valid @RequestBody CompanyLocationUpdateDto companyLocationUpdateDto){
        return companyService.locationUpdate(id, companyLocationUpdateDto);
    }
    @PutMapping("/{id}/updateEmail")
    public Company updateEmail(@PathVariable Long id, @Valid @RequestBody CompanyEmailUpdateDto companyEmailUpdateDto){
        return companyService.emailUpdate(id, companyEmailUpdateDto);
    }
    @PutMapping("/{id}/updatePassword")
    public Company updatePassword(@PathVariable Long id, @Valid @RequestBody CompanyPasswordUpdateDto companyPasswordUpdateDto){
        return companyService.passwordUpdate(id, companyPasswordUpdateDto);
    }
    @PutMapping("/{id}/updateCover")
    public Company updateCompanyCover(@PathVariable Long id, @Valid @RequestBody CompanyCoverUpdateDto companyCoverUpdateDto){
        return companyService.companyCoverUpdate(id, companyCoverUpdateDto);
    }
    @PutMapping("/{id}/updateLogo")
    public Company updateCompanyLogo(@PathVariable Long id, @Valid @RequestBody CompanyLogoUpdateDto companyLogoUpdateDto){
        return companyService.companyLogoUpdate(id, companyLogoUpdateDto);
    }

}