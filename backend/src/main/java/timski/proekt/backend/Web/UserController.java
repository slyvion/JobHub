package timski.proekt.backend.Web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import timski.proekt.backend.Model.Dto.User.UserEmailUpdateDto;
import timski.proekt.backend.Model.Dto.User.UserImgUpdateDto;
import timski.proekt.backend.Model.Dto.User.UserPasswordUpdateDto;
import timski.proekt.backend.Model.User;
import timski.proekt.backend.Service.UserService;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @PutMapping("/{id}/passwordUpdate")
    public User updatePassword(@PathVariable Long id,
                                 @Valid @RequestBody UserPasswordUpdateDto userDto) {
        return userService.PasswordUpdate(id, userDto);
    }
    @PutMapping("/{id}/emailUpdate")
    public User updateEmail(@PathVariable long id, @Valid @RequestBody UserEmailUpdateDto userDto){
        return userService.EmailUpdate(id, userDto);
    }

    @PutMapping("/{id}/imageUpdate")
    public User updateImage(@PathVariable Long id, @Valid @RequestBody UserImgUpdateDto userImgUpdateDto){
        return userService.uploadUserLogo(id, userImgUpdateDto);
    }

}
