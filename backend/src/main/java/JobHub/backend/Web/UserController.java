package JobHub.backend.Web;

import JobHub.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import JobHub.backend.Model.Dto.User.UserEmailUpdateDto;
import JobHub.backend.Model.Dto.User.UserPasswordUpdateDto;
import JobHub.backend.Model.User;

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
    public User updatePassword(@PathVariable Long id, @Valid @RequestBody UserPasswordUpdateDto userDto) {
        return userService.PasswordUpdate(id, userDto);
    }
    @PutMapping("/{id}/emailUpdate")
    public User updateEmail(@PathVariable long id, @Valid @RequestBody UserEmailUpdateDto userDto){
        return userService.EmailUpdate(id, userDto);
    }


}
