package timski.proekt.backend.Service;

import org.springframework.web.multipart.MultipartFile;
import timski.proekt.backend.Model.Dto.User.UserEmailUpdateDto;
import timski.proekt.backend.Model.Dto.User.UserImgUpdateDto;
import timski.proekt.backend.Model.Dto.User.UserPasswordUpdateDto;
import timski.proekt.backend.Model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User findById(Long id);

    public List<User> listAll();


    Optional<User> findByEmail(String email);

    User uploadUserLogo(Long id, UserImgUpdateDto userImgUpdateDto);

    byte[] getUserLogo(Long companyId);

    User PasswordUpdate(long id, UserPasswordUpdateDto passwordUpdateDto);

    User EmailUpdate(long id, UserEmailUpdateDto userEmailUpdateDto);

    //todo: create / update
}