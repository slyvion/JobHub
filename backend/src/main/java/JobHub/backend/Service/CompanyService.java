package JobHub.backend.Service;

import JobHub.backend.Model.Constants.EmployeeNumber;
import JobHub.backend.Model.Dto.Company.*;
import JobHub.backend.Model.Company;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CompanyService {


    Company findById(Long id);

    List<Company> findByName(String name);

    Company create(CompanyCreateDto companyCreateDto);

    Company nameUpdate(Long id, CompanyNameUpdateDto companyNameUpdateDto);

    Company employeeNumberUpdate(Long id, CompanyEmployeeNumberUpdateDto companyEmployeeNumberUpdateDto);

    Company emailUpdate(Long id, CompanyEmailUpdateDto companyEmailUpdateDto);

    Company socialMediaUpdate(Long id, CompanySocialMediaUpdateDto companySocialMediaUpdateDto);


    Company bioUpdate(Long id, CompanyBioUpdateDto companyBioUpdateDto);

    Company foundedUpdate(Long id, CompanyFoundedUpdateDto companyFoundedUpdateDto);

    Company phoneUpdate(Long id, CompanyPhoneUpdateDto companyPhoneUpdateDto);

    Company locationUpdate(Long id, CompanyLocationUpdateDto companyLocationUpdateDto);

    Company websiteUpdate(Long id, CompanyWebsiteUpdateDto companyWebsiteUpdateDto);

    Company passwordUpdate(Long id, CompanyPasswordUpdateDto companyPasswordUpdateDto);

    Company companyLogoUpdate(Long companyId, MultipartFile file) throws IOException;

    Company companyCoverUpdate(Long companyId, MultipartFile file) throws IOException;

    Company updateCompanyCities(Long companyId, CompanyCitiesUpdateDto companyCitiesUpdateDto);

    Company delete(Long id);


    List<Company> listAll();


    List<Company> companyFilter(String name, String location, Double rating, EmployeeNumber employeeNumber);

}
