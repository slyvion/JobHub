package JobHub.backend.Service.impl;

import JobHub.backend.Model.Constants.EmployeeNumber;
import JobHub.backend.Model.Dto.Company.*;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import JobHub.backend.Model.Company;
import JobHub.backend.Repository.CompanyRepository;
import JobHub.backend.Service.CompanyService;
import JobHub.backend.exceptions.InvalidCompanyIdException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyServiceImpl(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public List<Company> listAll() {
        return companyRepository.findAll();
    }


    @Override
    public Company findById(Long id) {
        return companyRepository.findById(id).orElseThrow(InvalidCompanyIdException::new);
    }

    @Override
    public List<Company> findByName(String name) {
        return companyRepository.findCompaniesByCompanyName(name);
    }

    @Override
    public Company create(CompanyCreateDto companyDto) {
        Company company = new Company(
                companyDto.getCompanyName(),
                companyDto.getEmail(),
                companyDto.getPassword(),
                companyDto.getLocation()
        );

        return companyRepository.save(company);
    }


    @Override
    public Company nameUpdate(Long id, CompanyNameUpdateDto companyNameUpdateDto) {
        Company company = this.findById(id);
        company.setCompanyName(companyNameUpdateDto.getCompanyName());
        return companyRepository.save(company);
    }



    @Override
    public Company employeeNumberUpdate(Long id, CompanyEmployeeNumberUpdateDto companyEmployeeNumberUpdateDto) {
        Company company = this.findById(id);
        company.setEmployeeNumber(companyEmployeeNumberUpdateDto.getEmployeeNumber());
        return companyRepository.save(company);
    }

    @Override
    public Company emailUpdate(Long id, CompanyEmailUpdateDto companyEmailUpdateDto) {
        Company company = this.findById(id);
        company.setEmail(companyEmailUpdateDto.getEmail());
        return companyRepository.save(company);
    }

    @Override
    public Company socialMediaUpdate(Long id, CompanySocialMediaUpdateDto companySocialMediaUpdateDto) {
        Company company = this.findById(id);
        company.setFacebookLink(companySocialMediaUpdateDto.getFacebookLink());
        company.setInstagramLink(companySocialMediaUpdateDto.getInstagramLink());
        company.setLinkedinLink(companySocialMediaUpdateDto.getLinkedinLink());
        return companyRepository.save(company);
    }


    @Override
    public Company bioUpdate(Long id, CompanyBioUpdateDto companyBioUpdateDto) {
        Company company = this.findById(id);
        company.setDescription(companyBioUpdateDto.getDescription());
        return companyRepository.save(company);
    }

    @Override
    public Company foundedUpdate(Long id, CompanyFoundedUpdateDto companyFoundedUpdateDto) {
        Company company = this.findById(id);
        company.setFounded(companyFoundedUpdateDto.getFounded());
        return companyRepository.save(company);
    }

    @Override
    public Company phoneUpdate(Long id, CompanyPhoneUpdateDto companyPhoneUpdateDto) {
        Company company = this.findById(id);
        company.setPhoneNumber(companyPhoneUpdateDto.getPhoneNumber());
        return  companyRepository.save(company);
    }

    @Override
    public Company locationUpdate(Long id, CompanyLocationUpdateDto companyLocationUpdateDto) {
        Company company = this.findById(id);
        company.setLocation(companyLocationUpdateDto.getLocation());
        return companyRepository.save(company);
    }

    @Override
    public Company websiteUpdate(Long id, CompanyWebsiteUpdateDto companyWebsiteUpdateDto) {
        Company company = this.findById(id);
        company.setWebsite(companyWebsiteUpdateDto.getWebsite());

        return companyRepository.save(company);
    }

    @Override
    public Company passwordUpdate(Long id, CompanyPasswordUpdateDto companyPasswordUpdateDto) {
        Company company = this.findById(id);
        if (!company.getPassword().equals(companyPasswordUpdateDto.getOldPassword())) {
            throw new IllegalArgumentException("Old password is incorrect");
        }
        if (!companyPasswordUpdateDto.getNewPassword().equals(companyPasswordUpdateDto.getConfirmPassword())) {
            throw new IllegalArgumentException("New password and confirm password do not match");
        }
        company.setPassword(companyPasswordUpdateDto.getNewPassword());

        return companyRepository.save(company);
    }


    @Override
    public Company delete(Long id) {
        Company company = this.findById(id);
        companyRepository.delete(company);
        return company;
    }

    @Override
    public Company companyLogoUpdate(Long companyId, MultipartFile file) throws IOException {

        Company company = companyRepository.findById(companyId)
                .orElseThrow(InvalidCompanyIdException::new);

        String originalFileName = file.getOriginalFilename();
        String extension = "";

        if (originalFileName != null && originalFileName.contains(".")) {
            extension = originalFileName.substring(originalFileName.lastIndexOf('.') + 1);
        }

        company.setCompanyLogo(file.getBytes());
        company.setLogoType(file.getContentType());
        company.setLogoExtension(extension);

        return companyRepository.save(company);
    }


    @Override
    public Company companyCoverUpdate(Long companyId, MultipartFile file) throws IOException {

        Company company = companyRepository.findById(companyId)
                .orElseThrow(InvalidCompanyIdException::new);

        String originalFileName = file.getOriginalFilename();
        String extension = "";

        if (originalFileName != null && originalFileName.contains(".")) {
            extension = originalFileName.substring(originalFileName.lastIndexOf('.') + 1);
        }

        company.setCompanyCover(file.getBytes());
        company.setCoverType(file.getContentType());
        company.setCoverExtension(extension);

        return companyRepository.save(company);
    }

    @Override
    public Company updateCompanyCities(Long companyId, CompanyCitiesUpdateDto companyCitiesUpdateDto) {
        Company company = this.findById(companyId);
        company.setCities(companyCitiesUpdateDto.getCities());
        return companyRepository.save(company);
    }

    @Override
    public List<Company> companyFilter(String companyName, String location, Double rating, EmployeeNumber employeeNumber) {
        return companyRepository.findAll((Specification<Company>) (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (companyName != null) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("companyName")), "%" + companyName.toLowerCase() + "%"));
            }

            if (location != null) {
                predicates.add(criteriaBuilder.equal(root.get("location"), location));
            }

            if (rating != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("rating"), rating));
            }
            if (employeeNumber != null) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("employeeNumber").as(String.class)), "%" + employeeNumber.toString().toLowerCase() + "%"));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

    @Override
    public List<Company> companyAdminFilter(String companyName, String location, Double rating, EmployeeNumber employeeNumber, Integer founded, String website, String email) {
        return companyRepository.findAll((Specification<Company>) (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (companyName != null) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("companyName")), "%" + companyName.toLowerCase() + "%"));
            }

            if (location != null) {
                predicates.add(criteriaBuilder.equal(root.get("location"), location));
            }

            if (rating != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("rating"), rating));
            }
            if (employeeNumber != null) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("employeeNumber").as(String.class)), "%" + employeeNumber.toString().toLowerCase() + "%"));
            }
            if(founded != null) {
                predicates.add(criteriaBuilder.equal(root.get("founded"), founded));
            }
            if (website != null) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("website")), "%" + website.toLowerCase() + "%"));
            }
            if (email != null) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), email.toLowerCase() + "%"));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

}
