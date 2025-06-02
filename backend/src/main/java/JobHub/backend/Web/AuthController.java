package JobHub.backend.Web;

import JobHub.backend.Model.Company;
import JobHub.backend.Model.User;
import JobHub.backend.Model.Dto.Company.CompanyCreateDto;
import JobHub.backend.Model.Dto.User.UserDto;
import JobHub.backend.Repository.CompanyRepository;
import JobHub.backend.Repository.UserRepository;
import JobHub.backend.Security.JwtUtil;
import JobHub.backend.Security.LoginRequest;
import JobHub.backend.Security.JwtResponse;
import JobHub.backend.Service.CompanyService;
import JobHub.backend.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final CompanyService companyService;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;

    public AuthController(AuthenticationManager authManager,
                          JwtUtil jwtUtil,
                          UserService userService,
                          CompanyService companyService,
                          UserRepository userRepository,
                          CompanyRepository companyRepository) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
        this.companyService = companyService;
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            String token = jwtUtil.generateToken(request.getEmail());
            return ResponseEntity.ok(new JwtResponse(token));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        }
    }

    @PostMapping("/register/user")
    public ResponseEntity<?> registerUser(@RequestBody UserDto userDto) {
        try {
            userService.create(userDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("User registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/register/company")
    public ResponseEntity<?> registerCompany(@RequestBody CompanyCreateDto companyDto) {
        try {
            companyService.create(companyDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Company registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Company registration failed: " + e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getAuthenticatedEntity(Authentication authentication) {
        String email = authentication.getName();

        Optional<User> user = userRepository.findUserByEmail(email);
        if (user.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("type", "user");
            response.put("data", user.get());
            return ResponseEntity.ok(response);
        }

        Optional<Company> company = companyRepository.findCompanyByEmail(email);
        if (company.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("type", "company");
            response.put("data", company.get());
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or unknown user.");
    }
}
