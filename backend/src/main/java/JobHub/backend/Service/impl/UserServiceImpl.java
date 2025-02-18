package JobHub.backend.Service.impl;

import JobHub.backend.Model.Dto.User.UserDto;
import JobHub.backend.Service.UserService;
import JobHub.backend.exceptions.InvalidUserIdException;
import org.springframework.stereotype.Service;
import JobHub.backend.Model.Dto.User.UserEmailUpdateDto;
import JobHub.backend.Model.Dto.User.UserPasswordUpdateDto;
import JobHub.backend.Model.User;
import JobHub.backend.Repository.UserRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
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
    public User PasswordUpdate(long id, UserPasswordUpdateDto passwordUpdateDto) {
        User user = this.findById(id);

        if (!user.getPassword().equals(passwordUpdateDto.getOldPassword())) {
            throw new IllegalArgumentException("Old password is incorrect");
        }
        if (!passwordUpdateDto.getNewPassword().equals(passwordUpdateDto.getConfirmPassword())) {
            throw new IllegalArgumentException("New password and confirm password do not match");
        }
        user.setPassword(passwordUpdateDto.getNewPassword());

        return userRepository.save(user);
    }

    @Override
    public User EmailUpdate(long id, UserEmailUpdateDto userEmailUpdateDto) {
        User user = this.findById(id);

        Optional<User> existingUserOptional = userRepository.findUserByEmail(userEmailUpdateDto.getEmail());
        if (existingUserOptional.isPresent() && !existingUserOptional.get().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Email already in use");
        }
        else {
            user.setEmail(userEmailUpdateDto.getEmail());
        }

        return userRepository.save(user);
    }

    @Override
    public User create(UserDto userDto) {
        User user = new User(
                userDto.getUsername(),
                userDto.getEmail(),
                userDto.getPassword()
                );

        return userRepository.save(user);
    }

//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        return null;
//    }


    //public class UserServiceImpl implements UserService, UserDetailsService
    //{
    //    @Autowired
    //    private UserRepository userRepository;
    //    @Autowired
    //    private PasswordEncoder passwordEncoder;
    //    @Override
    //    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    //        User u = userRepository.findByUsername(username);
    //        if(u==null)
    //        {
    //            throw new UsernameNotFoundException(username);
    //        }
    //
    //        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
    //                u.getUsername(),
    //                u.getPassword(),
    //                Stream.of(new SimpleGrantedAuthority(u.getRole())).collect(Collectors.toList()));
    //        return userDetails;
    //    }
    //}
    //              OD WP
}
