package timski.proekt.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import timski.proekt.backend.Model.Company;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long>, JpaSpecificationExecutor<Company> {

    List<Company> findCompaniesByLocation(String location);

    List<Company> findCompaniesByCompanyName(String name);



}
