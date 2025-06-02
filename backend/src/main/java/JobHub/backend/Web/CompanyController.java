package JobHub.backend.Web;

import JobHub.backend.Model.Dto.Company.*;
import JobHub.backend.Service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import JobHub.backend.Model.Company;
import JobHub.backend.Model.Dto.ReviewDto;
import JobHub.backend.Model.Review;
import JobHub.backend.Service.ReviewService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ContentDisposition;
import org.springframework.web.multipart.MultipartFile;


import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @Autowired
    private ReviewService reviewService;


    @GetMapping("/{id}")
    public CompanyDetailsDto getCompanyById(@PathVariable Long id) {
        return companyService.findById(id).mapToDetails();
    }

    @PostMapping
    public Company create(@Valid @RequestBody CompanyCreateDto companyDto) {
        return companyService.create(
                companyDto
        );
    }
    @GetMapping("/{id}/reviews")
    public List<Review> getReviewByCompanyId(@PathVariable Long id){
        return reviewService.findAllByCompanyId(id);
    }


    @PostMapping("/{id}/delete")
    public String deleteCompany(@PathVariable Long id) {
        companyService.delete(id);
        return "redirect:/companies";
    }
    @PutMapping("/{id}/add-review")
    public Review addReview(@PathVariable Long id,
                            @Valid @RequestBody ReviewDto reviewDto) {
        return reviewService.create(reviewDto);
    }
    @PutMapping("/{id}/updateBio")
    public Company updateBio(@PathVariable Long id,
                             @Valid @RequestBody CompanyBioUpdateDto companyBioUpdateDto){
        return companyService.bioUpdate(id, companyBioUpdateDto);
    }
    @PutMapping("/{id}/updateName")
    public Company updateName(@PathVariable Long id,
                              @Valid @RequestBody CompanyNameUpdateDto companyNameUpdateDto){
        return companyService.nameUpdate(id, companyNameUpdateDto);
    }
    @PutMapping("/{id}/updateWebsite")
    public Company updateWebsite(@PathVariable Long id,
                                 @Valid @RequestBody CompanyWebsiteUpdateDto companyWebsiteUpdateDto){
        return companyService.websiteUpdate(id, companyWebsiteUpdateDto);
    }
    @PutMapping("/{id}/updateLocation")
    public Company updateLocation(@PathVariable Long id,
                                  @Valid @RequestBody CompanyLocationUpdateDto companyLocationUpdateDto){
        return companyService.locationUpdate(id, companyLocationUpdateDto);
    }
    @PutMapping("/{id}/updateEmail")
    public Company updateEmail(@PathVariable Long id,
                               @Valid @RequestBody CompanyEmailUpdateDto companyEmailUpdateDto){
        return companyService.emailUpdate(id, companyEmailUpdateDto);
    }
    @PutMapping("/{id}/updatePassword")
    public Company updatePassword(@PathVariable Long id,
                                  @Valid @RequestBody CompanyPasswordUpdateDto companyPasswordUpdateDto){
        return companyService.passwordUpdate(id, companyPasswordUpdateDto);
    }
    @PutMapping("/{id}/updateFounded")
    public Company updateFounded(@PathVariable Long id,
                                 @Valid @RequestBody CompanyFoundedUpdateDto companyFoundedUpdateDto){
        return companyService.foundedUpdate(id, companyFoundedUpdateDto);
    }

    @PutMapping("/{id}/updateEmployeeNumber")
    public Company updateEmployeeNumber(@PathVariable Long id,
                                        @Valid @RequestBody CompanyEmployeeNumberUpdateDto companyEmployeeNumberUpdateDto){
        return companyService.employeeNumberUpdate(id, companyEmployeeNumberUpdateDto);
    }

    @GetMapping("{id}/getLogo")
    public ResponseEntity<Resource> getCompanyLogo(@PathVariable Long id) {

        Company company = companyService.findById(id);

        byte[] logoBytes = company.getCompanyLogo();
        String logoType = company.getLogoType();
        String logoExtension = company.getLogoExtension();

        if (logoBytes == null || logoBytes.length == 0) {
            try {
                ClassPathResource defaultLogo = new ClassPathResource("static/defaultLogo.jpg");
                logoBytes = defaultLogo.getInputStream().readAllBytes();
                logoType = "image/jpg";
                logoExtension = "defaultLogo.jpg";
            } catch (IOException e) {
                return ResponseEntity.internalServerError().build();
            }
        }

        Resource imageResource = new ByteArrayResource(logoBytes);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(logoType))
                .contentLength(logoBytes.length)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition.inline()
                                .filename(logoExtension)
                                .build()
                                .toString())
                .body(imageResource);
    }


    @PutMapping("/{id}/updateLogo")
    public ResponseEntity<Boolean> updateCompanyLogo(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        companyService.companyLogoUpdate(id, file);
        return ResponseEntity.ok(true);
    }

    @GetMapping("/{id}/getCover")
    public ResponseEntity<Resource> getCompanyCover(@PathVariable Long id){

        Company company = companyService.findById(id);

        byte[] coverBytes = company.getCompanyCover();
        String coverType = company.getCoverType();
        String coverExtension = company.getCoverExtension();

        if (coverBytes == null || coverBytes.length == 0) {
            try {
                ClassPathResource defaultLogo = new ClassPathResource("static/defaultCover.jpg");
                coverBytes = defaultLogo.getInputStream().readAllBytes();
                coverType = "image/jpg";
                coverExtension = "defaultCover.jpg";
            } catch (IOException e) {
                return ResponseEntity.internalServerError().build();
            }
        }

        Resource imageResource = new ByteArrayResource(coverBytes);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(coverType))
                .contentLength(coverBytes.length)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition.inline()
                                .filename(coverExtension)
                                .build()
                                .toString())
                .body(imageResource);
    }
    @PutMapping("/{id}/updateCover")
    public ResponseEntity<Boolean> updateCompanyCover(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        companyService.companyCoverUpdate(id, file);
        return ResponseEntity.ok(true);
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