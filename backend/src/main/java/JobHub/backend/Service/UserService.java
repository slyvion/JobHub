package JobHub.backend.Service;

import JobHub.backend.Model.Apply;
import JobHub.backend.Model.Constants.EmployeeNumber;
import JobHub.backend.Model.Constants.UserRole;
import JobHub.backend.Model.Dto.User.*;
import JobHub.backend.Model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    Integer usersCount();

    User findById(Long id);

    public List<User> listAll();

    Optional<User> findByEmail(String email);

    User PasswordUpdate(Long id, UserPasswordUpdateDto passwordUpdateDto);

    User EmailUpdate(Long id, UserEmailUpdateDto userEmailUpdateDto);

    User create(UserDto userDto);

    User deleteUser(Long id);

    List<ApplyDto> findAllAppliesByUserId(Long id);

    User roleUpdate(Long id, UserRoleUpdateDto userRoleUpdateDto);

    List<User> userFilter(String username, String Email, UserRole role);

}