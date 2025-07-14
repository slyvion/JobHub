package JobHub.backend.Repository;

import JobHub.backend.Model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long>, JpaSpecificationExecutor<Company> {

    List<Company> findCompaniesByLocation(String location);

    List<Company> findCompaniesByCompanyName(String name);

    Optional<Company> findCompanyByEmail(String email);

    @Query("SELECT COUNT(DISTINCT c) FROM Company c")
    Integer countAllDistinctCompanies();



}
