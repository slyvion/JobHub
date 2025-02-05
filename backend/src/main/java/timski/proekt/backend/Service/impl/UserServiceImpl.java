package timski.proekt.backend.Service.impl;

import org.springframework.stereotype.Service;
import timski.proekt.backend.Model.Dto.UserEmailUpdateDto;
import timski.proekt.backend.Model.Dto.UserPasswordUpdateDto;
import timski.proekt.backend.Model.User;
import timski.proekt.backend.Repository.UserRepository;
import timski.proekt.backend.Service.UserService;
import timski.proekt.backend.exceptions.InvalidUserIdException;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{


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

        if(user.getPassword() != passwordUpdateDto.getOldPassword()){
            throw new IllegalArgumentException("Old password is incorrect");
        }
        if(passwordUpdateDto.getNewPassword() != passwordUpdateDto.getConfirmPassword()){
            throw new IllegalArgumentException("New password and confirm password do not match");
        }
        else {
            user.setPassword(passwordUpdateDto.getNewPassword());
        }

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
