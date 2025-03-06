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
    public List<Company> findAllByLocation(String location) {
        return companyRepository.findCompaniesByLocation(location);
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
    public Company create(CompanyDto companyDto) {
        Company company = new Company(
                companyDto.getCompanyName(),
                companyDto.getEmail(),
                companyDto.getPassword(),
                companyDto.getWebsite(),
                companyDto.getDescription(),
                companyDto.getLocation(),
                companyDto.getFounded(),
                companyDto.getEmployeeNumber(),
                companyDto.getPhoneNumber(),
                companyDto.getFacebookLink(),
                companyDto.getInstagramLink(),
                companyDto.getLinkedinLink()
        );

        try {
            if (companyDto.getCompanyLogo() == null || companyDto.getCompanyLogo().isEmpty()) {
                company.setCompanyLogo(Files.readAllBytes(Paths.get("src/main/resources/static/default-logo.png")));
            } else {
                company.setCompanyLogo(Base64.getDecoder().decode(companyDto.getCompanyLogo()));
            }

            if (companyDto.getCompanyCover() == null || companyDto.getCompanyCover().isEmpty()) {
                company.setCompanyCover(Files.readAllBytes(Paths.get("src/main/resources/static/default-cover.png")));
            } else {
                company.setCompanyCover(Base64.getDecoder().decode(companyDto.getCompanyCover()));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return companyRepository.save(company);
    }

    @Override
    public Company update(Long id, CompanyDto companyDto) {
        Company company = this.findById(id);
        company.setCompanyName(companyDto.getCompanyName());
        company.setEmail(companyDto.getEmail());
        company.setWebsite(companyDto.getWebsite());
        company.setPassword(companyDto.getPassword());
        company.setDescription(companyDto.getDescription());
        company.setLocation(companyDto.getLocation());
        company.setEmployeeNumber(companyDto.getEmployeeNumber());
        company.setPhoneNumber(companyDto.getPhoneNumber());
        company.setFacebookLink(companyDto.getFacebookLink());
        company.setInstagramLink(companyDto.getInstagramLink());
        company.setLinkedinLink(companyDto.getLinkedinLink());

        try {
            if (companyDto.getCompanyLogo() != null && !companyDto.getCompanyLogo().isEmpty()) {
                company.setCompanyLogo(Base64.getDecoder().decode(companyDto.getCompanyLogo()));
            }
            if (companyDto.getCompanyCover() != null && !companyDto.getCompanyCover().isEmpty()) {
                company.setCompanyCover(Base64.getDecoder().decode(companyDto.getCompanyCover()));
            }
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid Base64 format for image");
        }
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
    public Company companyLogoUpdate(Long companyId, CompanyLogoUpdateDto companyLogoUpdateDto) {

        Company company = companyRepository.findById(companyId).orElseThrow(InvalidCompanyIdException::new);

        byte[] logoBytes = Base64.getDecoder().decode(companyLogoUpdateDto.getCompanyLogo());
        company.setCompanyLogo(logoBytes);

        return companyRepository.save(company);
    }

    @Override
    public Company companyCoverUpdate(Long companyId, CompanyCoverUpdateDto companyCoverUpdateDto) {

        Company company = companyRepository.findById(companyId).orElseThrow(InvalidCompanyIdException::new);

        byte[] coverBytes = Base64.getDecoder().decode(companyCoverUpdateDto.getCompanyCover());
        company.setCompanyCover(coverBytes);

        return companyRepository.save(company);
    }

    @Override
    public Company updateCompanyCities(Long companyId, CompanyCitiesUpdateDto companyCitiesUpdateDto) {
        Company company = this.findById(companyId);
        company.setCities(companyCitiesUpdateDto.getCities());
        return companyRepository.save(company);
    }
    @Override
    public byte[] getCompanyLogo(Long companyId) {
        Company company = companyRepository.findById(companyId).orElseThrow(InvalidCompanyIdException::new);

        return company.getCompanyLogo();
    }

    @Override
    public byte[] getCompanyCover(Long companyId) {
        Company company = companyRepository.findById(companyId).orElseThrow(InvalidCompanyIdException::new);

        return company.getCompanyCover();
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

}
