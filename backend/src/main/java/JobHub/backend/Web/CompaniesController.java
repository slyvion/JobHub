package JobHub.backend.Web;

import JobHub.backend.Model.Constants.EmployeeNumber;
import JobHub.backend.Model.Dto.Company.CompanyAdminSearchDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public Page<Company> companiesFilter(
            @RequestParam(required = false) String companyName,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Double rating,
            @RequestParam(required = false) EmployeeNumber employeeNumber,
            Pageable pageable
    ) {
        if (companyName == null &&
                location == null &&
                rating == null &&
                employeeNumber == null) {
            return companyService.listAll(pageable);
        }

        return companyService.companyFilter(companyName, location, rating, employeeNumber, pageable);
    }


    @PostMapping("/admin") // Page<Company>
        public List<Company> companiesAdminFilter(
//                @RequestParam(required = false, defaultValue = "1") Integer page,
//                @RequestParam(required = false, defaultValue = "10") Integer size,
                @RequestBody CompanyAdminSearchDto searchDto){
//        Pageable pageable = PageRequest.of(page - 1, size);
        return companyService.companyAdminFilter(searchDto); //, pageable


    }


}
