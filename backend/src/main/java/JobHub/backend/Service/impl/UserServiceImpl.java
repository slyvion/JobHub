package JobHub.backend.Service.impl;

import JobHub.backend.Model.Apply;
import JobHub.backend.Model.Constants.UserRole;
import JobHub.backend.Model.Dto.User.*;
import JobHub.backend.Repository.ApplicantsRepository;
import JobHub.backend.Service.UserService;
import JobHub.backend.exceptions.InvalidUserIdException;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import JobHub.backend.Model.User;
import JobHub.backend.Repository.UserRepository;


import java.util.ArrayList;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ApplicantsRepository applicantsRepository;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, ApplicantsRepository applicantsRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.applicantsRepository = applicantsRepository;
    }

    @Override
    public Integer usersCount() {
        return userRepository.countAllDistinctUser();
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(InvalidUserIdException::new);
    }

    @Override
    public List<User> listAll() {
        return userRepository.findAll();
    }


    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
    public List<ApplyDto> findAllAppliesByUserId(Long id) {
        List<Apply> applies = applicantsRepository.findAllByUserId(id);

        return applies.stream().map(apply -> {
            ApplyDto dto = new ApplyDto();
            dto.setFirstName(apply.getFirstName());
            dto.setLastName(apply.getLastName());
            dto.setEmail(apply.getEmail());
            dto.setPhoneNumber(apply.getPhoneNumber());
            dto.setLinkedinLink(apply.getLinkedinLink());
            dto.setAdditionalMessage(apply.getAdditionalMessage());
            dto.setStatus(apply.getStatus());
            dto.setJobPostId(apply.getJobPost().getId());
            dto.setUserId(apply.getUser().getId());
            dto.setAttachmentFileName(apply.getAttachmentFileName());
            dto.setAttachmentContentType(apply.getAttachmentContentType());
            dto.setApplyId(apply.getId());
            return dto;
        }).toList();
    }


    @Override
    public User PasswordUpdate(Long id, UserPasswordUpdateDto passwordUpdateDto) {
        User user = this.findById(id);

        if (!passwordEncoder.matches(passwordUpdateDto.getOldPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Old password is incorrect");
        }

        if (!passwordUpdateDto.getNewPassword().equals(passwordUpdateDto.getConfirmPassword())) {
            throw new IllegalArgumentException("New password and confirm password do not match");
        }
        user.setPassword(passwordEncoder.encode(passwordUpdateDto.getNewPassword()));


        return userRepository.save(user);
    }

    @Override
    public User EmailUpdate(Long id, UserEmailUpdateDto userEmailUpdateDto) {
        User user = this.findById(id);

        Optional<User> existingUserOptional = userRepository.findUserByEmail(userEmailUpdateDto.getEmail());
        if (existingUserOptional.isPresent() && !existingUserOptional.get().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Email already in use");
        } else {
            user.setEmail(userEmailUpdateDto.getEmail());
        }

        return userRepository.save(user);
    }

    @Override
    public User create(UserDto userDto) {
        String encodedPassword = passwordEncoder.encode(userDto.getPassword());

        User user = new User(
                userDto.getUsername(),
                userDto.getEmail(),
                encodedPassword
        );

        return userRepository.save(user);
    }

    @Transactional
    @Override
    public User deleteUser(Long id) {
        User user = this.findById(id);
        applicantsRepository.deleteByUserId(id);

        userRepository.delete(user);
        return user;
    }


    @Override
    public User roleUpdate(Long id, UserRoleUpdateDto userRoleUpdateDto) {
        User user = this.findById(id);
        user.setRole(userRoleUpdateDto.getUserRole());
        return userRepository.save(user);
    }

    @Override
    public List<User> userFilter(String username, String email, UserRole userRole) {
        return userRepository.findAll((Specification<User>) (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (username != null) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("username")), "%" + username.toLowerCase() + "%"));
            }

            if (email != null) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), "%" + email.toLowerCase() + "%"));
            }
            if (userRole != null) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("role").as(String.class)), "%" + userRole.toString().toLowerCase() + "%"));
            }


            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

    public static String getCurrentEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            UserDetails principal = (UserDetails) authentication.getPrincipal();
            return principal.getUsername();
        }
        return null;
    }
}
