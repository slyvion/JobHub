package JobHub.backend.Service;

import JobHub.backend.Model.Dto.User.UserDto;
import JobHub.backend.Model.Dto.User.UserEmailUpdateDto;
import JobHub.backend.Model.Dto.User.UserPasswordUpdateDto;
import JobHub.backend.Model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User findById(Long id);

    public List<User> listAll();

    Optional<User> findByEmail(String email);

    User PasswordUpdate(long id, UserPasswordUpdateDto passwordUpdateDto);

    User EmailUpdate(long id, UserEmailUpdateDto userEmailUpdateDto);

    User create(UserDto userDto);


}