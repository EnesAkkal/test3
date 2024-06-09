package com.enesakkal.communityapp.controllers;
import com.enesakkal.communityapp.models.community.Community;
import com.enesakkal.communityapp.models.user.User;
import com.enesakkal.communityapp.services.CommunityService;
import com.enesakkal.communityapp.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        return ResponseEntity.ok(service.getUserById(id));
    }

    @PostMapping("/{id}")
    public ResponseEntity<User> updateUserById(@PathVariable String id, @RequestBody User user) {
        return ResponseEntity.ok(service.updateUserById(id,user));
    }

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(service.getUsers());
    }

    @DeleteMapping("/deleteall")
    public ResponseEntity<String> deleteAllUsers() {
        service.deleteAllUsers();
        return ResponseEntity.ok("All users are deleted");
    }
}
