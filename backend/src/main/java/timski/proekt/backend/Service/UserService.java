package timski.proekt.backend.Service;

import timski.proekt.backend.Model.Dto.UserEmailUpdateDto;
import timski.proekt.backend.Model.Dto.UserPasswordUpdateDto;
import timski.proekt.backend.Model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User findById(Long id);

    public List<User> listAll();


    Optional<User> findByEmail(String email);


    User PasswordUpdate(long id, UserPasswordUpdateDto passwordUpdateDto);

    User EmailUpdate(long id, UserEmailUpdateDto userEmailUpdateDto);

    //todo: create / update
}