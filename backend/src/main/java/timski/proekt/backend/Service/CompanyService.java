package timski.proekt.backend.Service;

import timski.proekt.backend.Model.Company;
import timski.proekt.backend.Model.Dto.CompanyDto;

import java.util.List;

public interface CompanyService {


    Company findById(Long id);

    List<Company> findByName(String name);

    Company create(CompanyDto companyDto);

    Company update(Long id, CompanyDto companyDto);

    Company delete(Long id);

    List<Company> listAll();

    List<Company> findAllByLocation(String Location);

    List<Company> companyFilter(String name, String location, Double rating);

}
