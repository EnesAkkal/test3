package com.enesakkal.communityapp.services;
import com.enesakkal.communityapp.dtos.CredentialsDto;
import com.enesakkal.communityapp.dtos.SignUpDto;
import com.enesakkal.communityapp.dtos.UserDto;
import com.enesakkal.communityapp.exceptions.AppException;
import com.enesakkal.communityapp.models.user.User;
import com.enesakkal.communityapp.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class LoginService {
    private final UserRepository userRepository;

    public LoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepository.findByUsername(credentialsDto.username())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        if (credentialsDto.password().equals(user.getPassword())) {
            UserDto userDto = new UserDto();
            userDto.setUsername(user.getUsername());
            userDto.set_id(user.get_id());
            return userDto;
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUpDto signUpDto) {
        Optional<User> optionalUser = userRepository.findByUsername(signUpDto.username());

        if (optionalUser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }
        User user =  new User();
        user.setUsername(signUpDto.username());
        user.setPassword(signUpDto.password());
        user.setEmail(signUpDto.email());
        User savedUser = userRepository.save(user);

        return savedUser.toUserDto();
    }


}
