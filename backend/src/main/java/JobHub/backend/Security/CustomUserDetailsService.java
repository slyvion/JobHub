package JobHub.backend.Security;

import JobHub.backend.Model.Company;
import JobHub.backend.Model.User;
import JobHub.backend.Repository.CompanyRepository;
import JobHub.backend.Repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;

    public CustomUserDetailsService(UserRepository userRepository, CompanyRepository companyRepository) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findUserByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return org.springframework.security.core.userdetails.User
                    .withUsername(user.getEmail())
                    .password(user.getPassword())
                    .roles(user.getRole().name())
                    .build();
        }

        Optional<Company> optionalCompany = companyRepository.findCompanyByEmail(email);
        if (optionalCompany.isPresent()) {
            Company company = optionalCompany.get();
            return org.springframework.security.core.userdetails.User
                    .withUsername(company.getEmail())
                    .password(company.getPassword())
                    .roles("COMPANY")
                    .build();
        }

        throw new UsernameNotFoundException("User or company not found with email: " + email);
    }
}

