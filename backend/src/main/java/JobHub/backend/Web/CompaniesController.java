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


}
