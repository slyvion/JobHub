package JobHub.backend.Web;

import JobHub.backend.Model.Dto.Company.*;
import JobHub.backend.Service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import JobHub.backend.Model.Company;
import JobHub.backend.Model.Dto.ReviewDto;
import JobHub.backend.Model.Review;
import JobHub.backend.Service.ReviewService;

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
    public Review addReview(@PathVariable Long id, @Valid @RequestBody ReviewDto reviewDto) {
        return reviewService.create(reviewDto);
    }
    @PutMapping("/{id}/updateBio")
    public Company updateBio(@PathVariable Long id, @Valid @RequestBody CompanyBioUpdateDto companyBioUpdateDto){
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
    @PutMapping("/{id}/updateFounded")
    public Company updateFounded(@PathVariable Long id, @Valid @RequestBody CompanyFoundedUpdateDto companyFoundedUpdateDto){
        return companyService.foundedUpdate(id, companyFoundedUpdateDto);
    }
    @PutMapping("/{id}/updateCover")
    public Company updateCompanyCover(@PathVariable Long id, @Valid @RequestBody CompanyCoverUpdateDto companyCoverUpdateDto){
        return companyService.companyCoverUpdate(id, companyCoverUpdateDto);
    }
    @PutMapping("/{id}/updateEmployeeNumber")
    public Company updateEmployeeNumber(@PathVariable Long id, @Valid @RequestBody CompanyEmployeeNumberUpdateDto companyEmployeeNumberUpdateDto){
        return companyService.employeeNumberUpdate(id, companyEmployeeNumberUpdateDto);
    }
    @PutMapping("/{id}/updateLogo")
    public Company updateCompanyLogo(@PathVariable Long id, @Valid @RequestBody CompanyLogoUpdateDto companyLogoUpdateDto){
        return companyService.companyLogoUpdate(id, companyLogoUpdateDto);
    }
    @PutMapping("/{id}/updatePhone")
    public Company updateCompanyPhone(@PathVariable Long id, @Valid @RequestBody CompanyPhoneUpdateDto companyPhoneUpdateDto){
        return companyService.phoneUpdate(id, companyPhoneUpdateDto);
    }
    @PutMapping("/{id}/updateSocialMedia")
    public Company updateSocialMedia(@PathVariable Long id, @Valid @RequestBody CompanySocialMediaUpdateDto companySocialMediaUpdateDto){
        return  companyService.socialMediaUpdate(id, companySocialMediaUpdateDto);
    }
    @PutMapping("/{id}/updateOffices")
    public Company updateCompanyCities(@PathVariable Long id, @RequestBody CompanyCitiesUpdateDto companyCitiesUpdateDto) {
        return companyService.updateCompanyCities(id, companyCitiesUpdateDto);
    }

}