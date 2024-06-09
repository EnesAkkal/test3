package com.enesakkal.communityapp.controllers;

import com.enesakkal.communityapp.dtos.CredentialsDto;
import com.enesakkal.communityapp.dtos.SignUpDto;
import com.enesakkal.communityapp.dtos.UserDto;
import com.enesakkal.communityapp.services.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import java.net.URI;

@RequiredArgsConstructor
@RestController
public class AuthController {


    private final LoginService loginService;

    @GetMapping
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("System Working");
    }

    // @ RequestBody -> This annotation indicates that a method parameter should be bound to the body of the HTTP request.
    // @Valid -> This annotation is used to ensure that the incoming data adheres to the constraints set in the CredentialsDto class
    // @valid is provided by jakarta. 
    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody @Valid CredentialsDto credentialsDto) {
        UserDto userDto = loginService.login(credentialsDto);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody @Valid SignUpDto user) {
        UserDto createdUser = loginService.register(user);

        return ResponseEntity.created(URI.create("/users/" + createdUser.get_id())).body(createdUser);
    }


}
