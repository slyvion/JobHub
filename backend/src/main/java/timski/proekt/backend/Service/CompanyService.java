package timski.proekt.backend.Service;

import org.springframework.web.multipart.MultipartFile;
import timski.proekt.backend.Model.Company;
import timski.proekt.backend.Model.Dto.Company.*;

import java.util.List;

public interface CompanyService {


    Company findById(Long id);

    List<Company> findByName(String name);

    Company create(CompanyDto companyDto);

    Company update(Long id, CompanyDto companyDto);

    Company nameUpdate(Long id, CompanyNameUpdateDto companyNameUpdateDto);

    Company emailUpdate(Long id, CompanyEmailUpdateDto companyEmailUpdateDto);

    Company bioUpdate(Long id, CompanyBioUpdateDto companyBioUpdateDto);

    Company locationUpdate(Long id, CompanyLocationUpdateDto companyLocationUpdateDto);

    Company websiteUpdate(Long id, CompanyWebsiteUpdateDto companyWebsiteUpdateDto);

    Company passwordUpdate(Long id, CompanyPasswordUpdateDto companyPasswordUpdateDto);

    Company companyLogoUpdate(Long companyId, CompanyLogoUpdateDto companyLogoUpdateDto);

    Company companyCoverUpdate(Long companyId, CompanyCoverUpdateDto companyCoverUpdateDto);

    Company delete(Long id);


    byte[] getCompanyLogo(Long companyId);

    byte[] getCompanyCover(Long companyId);
    List<Company> listAll();

    List<Company> findAllByLocation(String Location);

    List<Company> companyFilter(String name, String location, Double rating);

}
