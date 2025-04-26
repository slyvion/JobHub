package JobHub.backend.Web;

import JobHub.backend.Model.Constants.EmployeeNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import JobHub.backend.Model.Company;
import JobHub.backend.Service.CompanyService;

import java.util.List;

@RestController
@RequestMapping("/companies")
public class CompaniesController {

    @Autowired
    private CompanyService companyService;


    @GetMapping("")
    public List<Company> companiesFilter(
            @RequestParam(required = false) String companyName,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Double rating,
            @RequestParam(required = false) EmployeeNumber employeeNumber
            ) {

        if ( companyName == null &&
             location == null &&
             rating == null &&
             employeeNumber == null){
            return companyService.listAll();
        }

        return companyService.companyFilter(companyName, location, rating, employeeNumber);
    }

    @GetMapping("/admin")
        public List<Company> companiesAdminFilter(
                @RequestParam(required = false) String companyName,
                @RequestParam(required = false) String location,
                @RequestParam(required = false) Double rating,
                @RequestParam(required = false) EmployeeNumber employeeNumber,
                @RequestParam(required = false) Integer founded,
                @RequestParam(required = false) String email,
                @RequestParam(required = false) String website
        ){
        if ( companyName == null &&
                location == null &&
                rating == null &&
                employeeNumber == null &&
                founded == null &&
                email == null &&
                website == null){
            return companyService.listAll();
        }
        return companyService.companyAdminFilter(companyName, location, rating, employeeNumber, founded, email, website);


    }


}
